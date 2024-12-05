# project-mud

## Overview
building a role-playing experience based on ad&d characters, monsters, game-play

## todo
- [x] get game engine running
- [ ] create guild area
- [ ] create half-elf race
- [ ] create half-elf home town
- [ ] create magic missle spell
- [ ] create kobold mob


## guild.area

                    PORTAL     
                   HOMETOWN  
                      │                
┌───────────┐   ┌───────────┐   ┌───────────┐
│   EMPTY   │───│    HALL   │───│   EMPTY   │
└───────────┘   └───────────┘   └───────────┘
                      │                
┌───────────┐   ┌───────────┐   ┌───────────┐
│    PIT    │───│    HALL   │───│   EMPTY   │           
└───────────┘   └───────────┘   └───────────┘
                      │                
┌───────────┐   ┌───────────┐   ┌───────────┐
│  LIBRARY  │───│    HALL   │───│  RECALL   │
└───────────┘   └───────────┘   └───────────┘


## halfelf.area
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
                                     


