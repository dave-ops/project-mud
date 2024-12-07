# project-mud

## Overview
building a role-playing experience based on ad&d characters, monsters, game-play

## todo
- [x] get game engine running
- [x] create guild area
  - [x] create the pit
  - [x] create the recall room
  - [ ] create the guild hometown portal
  - [ ] create the vendor
  - [ ] create the banker
- [x] create half-elf race
- [ ] create half-elf home town
- [x] create magic missle spell
- [x] create kobold mob


## guild.area
```
                                     ______ 
                                  ┌┘        └┐ 
                                  │  PORTAL  │
                                  │ HOMETOWN | 
                                  └┐   (3)  ┌┘                       
                                    └──────┘
                                        |
┌─────────────┐   ┌────────────┐   ┌───────────┐   ┌───────────┐
│ BIZAAR (2)  │───│ BIZAAR (2) │───│  HALLWAY  │───│   BANK    │
│ Food Vendor |   │ Fountain   │   │  Trainer  │   │           │
└─────────────┘   └────────────┘   └───────────┘   └───────────┘
       |                                |
┌─────────────┐   ┌───────────┐   ┌───────────┐   ┌───────────┐
│  BIZAAR (2) │   │  THE PIT  │───│  HALLWAY  │───│   NEWBIE  │
│Magic Vendor |   │   (pit)   │   │           │───│    (*)    │                
└─────────────┘   └───────────┘   └───────────┘   └───────────┘
       |                                |
┌─────────────┐   ┌───────────┐   ┌───────────┐   ┌───────────┐
│  BIZAAR (2) │   │  LIBRARY  │   |  HALLWAY  │   │   RECALL  │
│Weapon Vendor|   │ Librarian │───│           │───│           │                
│             |   │    (1)    |   │           │   │           │                
└─────────────┘   └───────────┘   └───────────┘   └───────────┘
       |                                
┌─────────────┐                    LEGEND:
│  BIZAAR (2) │                    (*) Newbie Spawn Point
│ Armor Vendor|                    (1) Ghost Librarian
└─────────────┘                    (2) Outside  
       |                           (3) Portal To Hometown
┌─────────────┐                    
│    TENT (2) │                    
│    GURU     |                    
│   Practice  |
└─────────────┘   

```

## halfelf.area
```
                        ┌───────────┐
        ┌───────────┐   │  HILLTOP  │
        │   BEFORE  │ / └───────────┘ 
        │    HILL   │             
        └───────────┘   
              │                
        ┌───────────┐   ┌───────────┐   ┌───────────┐
CONT ───│   GRASS   │───│   GRASS   │───│  BEHIND   │
        │           │   │           │   │  SHANTY   │
        └───────────┘   └───────────┘   └───────────┘
              │                               │                
        ┌───────────┐   ┌───────────┐   ┌───────────┐
CONT ───│  GRASS    │───│  SHANTY   │   │  BEHIND   │
        │           │   │           │   │  SHANTY   │
        └───────────┘   └───────────┘   └───────────┘
              │               │               │                
        ┌───────────┐   ┌───────────┐   ┌───────────┐
CONT ───│  GRASS    │───│    GRASS  │   │  BEHIND   │
        │           │   │           │   │  SHANTY   │
        └───────────┘   └───────────┘   └───────────┘
              │              │                │              
            CONT            CONT            PORTAL     
                                           HOMETOWN  
```                                     

# The DikuMUD Family Tree
```
The DikuMUD Family Tree
 

   ____________________________________DikuMUD_________________________ 
  |         |         |         |         |         |         |        |
Vie1      Silly    Pirate    Circle1   Diku_II   Sequent   Techno   Crimson
  |         |                   |                   |   
Vie2     DaleMUD        ______Circle2______       Copper1 
  |                   |         |         |         |
Vie3             Archipelago Circle3  LostLands   Copper2 ____________
  |                                                 |               |
Vie4                             _________________Merc1_______   Copper3 
  |                             |                   |         |
Vie5                         Rom1.0                  |        Vego 
                                :_________________Merc2________________
                                |         |         |         |        |
          ___________________Rom2.3    TheIsles     Envy1      SMAUG      ACK
         |         |            |      (NiMUD)      |        |
      Sunder    EmberMUD    ___Rom2.4 ___           _Envy2 _
                         |      |     |         |       |
                     Anatolia Wurm Oblivion  Mythran    EOS
                                 |
                               RockMUD
                                 |
                           The Kobold's Den
```