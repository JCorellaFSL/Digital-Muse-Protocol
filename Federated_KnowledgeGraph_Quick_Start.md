## **Federated Knowledge Graph System - Quick Start Guide**

### **System Overview**

This federated approach creates **5 specialized knowledge graphs** that work together:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Character KG   │    │    World KG     │    │    Plot KG      │
│                 │    │                 │    │                 │
│ • Personalities │    │ • Locations     │    │ • Events        │
│ • Relationships │    │ • World Rules   │    │ • Conflicts     │
│ • Character Arcs│    │ • Geography     │    │ • Timelines     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Master KG     │
                    │                 │
                    │ • Story Arcs    │
                    │ • Act Structure │
                    │ • Cross-refs    │
                    │ • Coordination  │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │  Narrative KG   │
                    │                 │
                    │ • Chapters      │
                    │ • Scenes        │
                    │ • Pacing        │
                    │ • Themes        │
                    └─────────────────┘
```

### **Implementation Steps**

#### **1. Setup Directory Structure**
```bash
mkdir -p ./book/memory
mkdir -p ./example_federated_graphs
```

#### **2. Configure MCP Servers**
Use the `federated_mcp_config.json` file provided:
```json
{
  "mcpServers": {
    "master_story": { /* Master coordination graph */ },
    "character_memory": { /* Character-focused graph */ },
    "world_memory": { /* World-building graph */ },
    "plot_memory": { /* Plot events graph */ },
    "narrative_memory": { /* Chapter/scene graph */ }
  }
}
```

#### **3. Initialize Each Domain**

**Master Graph Prompt:**
```
"Using master_story server, create the overall story structure with three acts. Reference specialized graphs using the format: character_graph::entity_name"
```

**Character Graph Prompt:**
```
"Using character_memory server, create detailed character profiles with arcs, relationships, and development. Include references back to master story acts."
```

**World Graph Prompt:**
```
"Using world_memory server, create locations, world rules, and environmental details. Cross-reference characters and plot events from other graphs."
```

**Plot Graph Prompt:**
```
"Using plot_memory server, create events, conflicts, and timelines. Reference characters and locations from their respective graphs."
```

**Narrative Graph Prompt:**
```
"Using narrative_memory server, create chapter outlines, scene breakdowns, and pacing structure. Reference all other graphs for content."
```

### **Cross-Domain Reference System**

#### **Reference Format:**
- `character_graph::Sarah_Chen` - References character from character graph
- `world_graph::NeoTokyo_2087` - References location from world graph  
- `plot_graph::betrayal_event` - References plot event from plot graph
- `narrative_graph::chapter_8` - References chapter from narrative graph
- `master_story::act_1_discovery` - References story element from master graph

#### **Example Cross-References:**

**In Master Graph:**
```json
{
  "name": "act_1_discovery",
  "observations": [
    "Primary character: character_graph::Sarah_Chen",
    "Primary setting: world_graph::MegaCorp_Tower", 
    "Key event: plot_graph::ai_awakening_incident",
    "Spans: narrative_graph::chapters_1_to_8"
  ]
}
```

**In Character Graph:**
```json
{
  "name": "Sarah_Chen", 
  "observations": [
    "Referenced in master: master_story::act_1_discovery",
    "Workplace: world_graph::MegaCorp_Tower_67th_Floor",
    "Key event: plot_graph::ai_awakening_incident"
  ]
}
```

### **Daily Workflow**

#### **Pre-Writing Session:**
1. **Query Master Graph**: "What story elements are planned for today's chapter?"
2. **Query Character Graph**: "What character development should occur?"
3. **Query World Graph**: "What locations and world details are needed?"
4. **Query Plot Graph**: "What events should happen in this chapter?"
5. **Query Narrative Graph**: "What's the pacing and thematic focus?"

#### **During Writing:**
- Reference multiple graphs as needed
- Add new observations to appropriate domain graphs
- Create new relations between existing entities

#### **Post-Writing Session:**
1. **Update Narrative Graph**: Add chapter completion, actual word count, themes covered
2. **Update Character Graph**: Add character development that occurred
3. **Update Plot Graph**: Mark events as completed, add new plot threads
4. **Update World Graph**: Add any new locations or world details introduced
5. **Update Master Graph**: Update act progress, cross-domain connections

### **Query Strategies**

#### **Consistency Checking:**
```
Master: "Search for all references to Sarah_Chen"
Character: "Show Sarah_Chen character arc progression"  
Plot: "Find all events involving Sarah_Chen"
World: "Show locations where Sarah_Chen appears"
Narrative: "List chapters featuring Sarah_Chen"
```

#### **Cross-Domain Analysis:**
```
"Show me all story elements related to the theme of technology vs humanity across all graphs"
"Find potential consistency issues between character development and plot events"
"Identify any locations mentioned in plot that aren't fully developed in world graph"
```

### **Benefits You'll Experience**

#### **Performance**
- **Faster Queries**: Smaller, focused graphs respond quicker
- **Parallel Work**: Develop characters while someone else works on world-building
- **Specialized Search**: Find character info without scanning through location data

#### **Organization** 
- **Clear Domains**: Know exactly where each type of information lives
- **Reduced Complexity**: Each graph handles 20-50 entities instead of 200+
- **Focused Sessions**: Work on character development without plot distractions

#### **Quality Control**
- **Domain Expertise**: Develop deep character knowledge separate from plot mechanics
- **Cross-Validation**: Ensure character actions align with established personality
- **Consistency Tracking**: Verify world rules are applied consistently across plot events

### **Troubleshooting**

**"I can't find information across graphs"**
- Use the cross-reference format: `graph_name::entity_name`
- Check master graph for high-level coordination
- Search multiple graphs if unsure of domain

**"Graphs are getting out of sync"**
- Update master graph after major changes
- Use cross-references to maintain connections
- Run regular consistency checks across domains

**"Too many servers to manage"**
- Start with master + one specialized graph
- Add additional graphs as project complexity grows
- Use single-graph system for simpler projects

### **When to Use Federated vs Single Graph**

**Use Single Graph When:**
- First-time projects or learning the system
- Simple stories (< 50 total entities)
- Solo writing projects
- Short stories or novellas

**Use Federated System When:**
- Complex narratives with multiple POV characters
- Rich world-building requirements
- Team/collaborative writing projects  
- Novel-length works (80K+ words)
- Multiple story arcs or subplots

**The federated system transforms your Digital Muse Protocol into a sophisticated narrative intelligence platform that scales with your story's complexity.**