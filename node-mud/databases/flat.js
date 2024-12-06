/*
	Flat file data persistence for RockMUD Areas. Data saves a JSON file.

	Persistence files are saved in directories within the areas folder. 

	No player persistence code. Instead we can rely on RockMUDs default flat-file behavior
	which saves players into the players directory.
*/
'use strict';
var fs = require('fs');

module.exports = function(config) {
	// Setup driver-wide properties
	var Driver = function() {
		var defaultPath = './areas';
		var persistenceFolder = '/persistence';
		var persistenceFolderExists = false;

		if (config) {
			if (!config.path) {
				this.path = defaultPath;
			} else {
				this.path = config.path;
			}

			if (!config.persistenceFolder) {
				this.persistenceFolder= persistenceFolder;
			} else {
				this.persistenceFolder = config.persistenceFolder;
			}

			this.config = config;
		}

		return this;
	};
	
	// Get all areas. This is the first driver callback executed.
	// Must be given a function which is passed an array of created areas.
	Driver.prototype.loadAreas = function(fn) {
		var driver = this,
		areas  = [];

		if (!driver.persistenceFolderExists) {
			fs.readdir(driver.path + driver.persistenceFolder, function(err, persistenceDirectoryFiles) {
				if (err && err.code === 'ENOENT') {
					fs.mkdir(driver.path + driver.persistenceFolder, function(err) {
						if (!err) {
							driver.persistenceFolderExists = true;

							return fn(areas);
						}
					});
				} else if (!persistenceDirectoryFiles.length) {
					driver.persistenceFolderExists = true;
					
					return fn(areas);
				} else {
					driver.persistenceFolderExists = true;

					persistenceDirectoryFiles.forEach(function(filename, index) {
						var areaId = filename.replace('.json', '');

						driver.loadArea(areaId, function(area) {
							if (area) {
								areas.push(area);
							}

							if (index === persistenceDirectoryFiles.length - 1) {
								return fn(areas);
							}
						});
					});
				}
			});
		}
	};

	Driver.prototype.loadArea = function(areaId, fn) {
		var driver = this;

		fs.readFile(driver.path + driver.persistenceFolder + '/' + areaId + '.json', function (err, r) {
			if (err) {
				return fn(false);
			} else {
				return fn(JSON.parse(r));
			}
		});
	};

	Driver.prototype.saveArea = function(area, fn) {
		var driver = this;

		if (driver.persistenceFolderExists) {
			fs.writeFile(driver.path + driver.persistenceFolder + '/' + area.id + '.json', JSON.stringify(area, null), function (err) {
				if (!err) {
					if (fn) {
						return fn(area);
					}
				} else {
					if (fn) {
						return fn(err);
					}
				}
			});
		}
	};

	return new Driver();
}

