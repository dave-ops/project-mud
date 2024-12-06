# project-mud

## Overview
building a role-playing experience based on ad&d characters, monsters, game-play

## todo
- [x] get game engine running
- [x] create guild area
  - [x] create the pit
  - [x] create the recall room
  - [ ] create the guild hometown portal
- [x] create half-elf race
- [ ] create half-elf home town
- [ ] create magic missle spell
- [ ] create kobold mob


## guild.area
```
                    PORTAL     
                   HOMETOWN  
                      │                
┌───────────┐   ┌───────────┐   ┌───────────┐
│  VENDOR   │───│  HALLWAY  │───│   CHAT    │
└───────────┘   └───────────┘   └───────────┘
                      │                
┌───────────┐   ┌───────────┐   ┌───────────┐
│    PIT    │───│  HALLWAY  │───│   NEWBIE  │           
└───────────┘   └───────────┘   └───────────┘
                      │                
┌───────────┐   ┌───────────┐   ┌───────────┐
│  LIBRARY  │───│  HALLWAY  │───│  RECALL   │
└───────────┘   └───────────┘   └───────────┘
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


