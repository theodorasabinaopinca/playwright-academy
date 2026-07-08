┌─────────────────────────────────────────────────────────────────────┐
│                      YOUR JAVASCRIPT CODE                           │
│  const name = "test"; function greet() { console.log("Hello"); }    │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    STEP 1: PARSING                                  │
│  JS Engine reads your code and checks for syntax errors             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    STEP 2: COMPILATION                              │
│  Converts JS code → Machine Code.                                   │
│  ⚡ Happens at RUNTIME (on-the-fly, not during development)          │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    STEP 3: EXECUTION                                │
│  Machine code runs on your computer's processor                     │
│                                                                     │
│  -  Single-threaded: One task at a time                             │
│  -  Non-blocking: Doesn't freeze on slow operations                 │
│  -  Dynamic & Weakly Typed: Types inferred automatically            │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    THE EVENT LOOP                                   │
│  Manages async tasks (page loads, timers, network requests)         │
│                                                                     │  
└─────────────────────────────────────────────────────────────────────┘