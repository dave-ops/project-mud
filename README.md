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
