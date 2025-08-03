### **Digital Muse Protocol - Knowledge Graph Memory Implementation Guide**

**Purpose:** This guide provides detailed instructions for implementing a knowledge graph memory system within the Digital Muse Protocol using MCP (Model Context Protocol) servers.

---

## **Option 1: MCP Memory Server (Recommended)**

### **Setup Instructions**

1. **Create Project Memory Directory:**
   ```bash
   mkdir -p ./book/memory
   ```

2. **Install MCP Memory Server:**
   ```bash
   # For NPX installation (auto-installs when needed)
   npx -y @modelcontextprotocol/server-memory
   ```

3. **Configure Claude Desktop (or compatible client):**
   ```json
   {
     "mcpServers": {
       "dm_protocol_memory": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-memory"],
         "env": {
           "MEMORY_FILE_PATH": "./book/memory/dm_protocol_memory.json"
         },
         "autoapprove": [
           "create_entities",
           "create_relations", 
           "add_observations",
           "search_nodes",
           "read_graph"
         ]
       }
     }
   }
   ```

4. **Project Structure After Setup:**
   ```
   Digital Muse Protocol/
   ├── DMProtocol_overview.md
   ├── book/
   │   ├── characters/
   │   ├── world/
   │   ├── plots/
   │   ├── memory/
   │   │   └── dm_protocol_memory.json  # ← Knowledge graph database
   │   └── chapters/
   └── claude_desktop_config.json
   ```

### **Knowledge Graph Structure for Digital Muse Protocol**

#### **Entity Types:**
- **Characters**: `protagonist`, `antagonist`, `supporting_character`
- **Locations**: `setting`, `landmark`, `region`
- **Organizations**: `faction`, `company`, `government`
- **Plot Elements**: `event`, `conflict`, `mystery`, `subplot`
- **World Building**: `rule`, `technology`, `culture`, `history`

#### **Relation Types:**
- **Character Relations**: `works_at`, `knows`, `related_to`, `opposes`, `loves`, `fears`
- **Location Relations**: `located_in`, `connects_to`, `owned_by`
- **Plot Relations**: `causes`, `resolves`, `precedes`, `involves`
- **Narrative Relations**: `mentioned_in_chapter`, `introduced_in`, `arc_belongs_to`

#### **Observation Categories:**
- **Physical**: Appearance, abilities, limitations
- **Psychological**: Motivations, fears, personality traits
- **Historical**: Background events, relationships, experiences
- **Narrative**: Chapter appearances, story function, character arc progress

---

## **Implementation Workflow**

### **Phase 1: Initial Setup**
```javascript
// Example entity creation for protagonist
{
  "entities": [
    {
      "name": "Sarah_Chen",
      "entityType": "protagonist", 
      "observations": [
        "Age 32, cybersecurity expert",
        "Has a fatal flaw of trusting technology over people",
        "Core motivation: Prevent AI uprising she accidentally enabled"
      ]
    }
  ]
}
```

### **Phase 2: World Building Integration**
```javascript
// Example world building entities
{
  "entities": [
    {
      "name": "NeoTokyo_2087",
      "entityType": "setting",
      "observations": [
        "Cyberpunk metropolis with holographic advertisements",
        "Underground resistance operates in old subway tunnels",
        "Corporate towers pierce perpetual smog layer"
      ]
    }
  ],
  "relations": [
    {
      "from": "Sarah_Chen",
      "to": "NeoTokyo_2087", 
      "relationType": "lives_in"
    }
  ]
}
```

### **Phase 3: Chapter-by-Chapter Memory Updates**
```javascript
// After each chapter, update with new information
{
  "observations": [
    {
      "entityName": "Sarah_Chen",
      "contents": [
        "Discovered betrayal by mentor in Chapter 3",
        "Acquired neural implant hacking device",
        "Now suspects corporate conspiracy reaches government level"
      ]
    }
  ]
}
```

---

## **Integration with Writing Workflow** 

### **Pre-Chapter Prompts:**
```
Before writing Chapter X, query the knowledge graph:
1. "Search for all entities related to [current scene location]"
2. "Show me all observations about [characters in this chapter]" 
3. "Find relations between [plot elements being developed]"
```

### **Post-Chapter Updates:**
```
After completing Chapter X:
1. Add new character observations revealed
2. Create relations for new character interactions
3. Update plot entity observations with story progression
4. Link chapter events to existing world building elements
```

### **Consistency Checking:**
```
Periodically query the graph for:
- Contradictory observations about same entity
- Missing relations between characters who should know each other
- Timeline inconsistencies in sequential events
- Orphaned entities not connected to main story
```

---

## **Advanced Queries for Quality Control**

### **Character Consistency:**
```
"Search for all observations about [character_name] personality traits"
"Find all relations where [character_name] interacts with others"
"Show timeline of [character_name] development across chapters"
```

### **Plot Thread Tracking:**
```
"Find all entities related to [main_conflict]"
"Show progression of [subplot_name] through story events"
"Identify unresolved plot elements without conclusion entities"
```

### **World Building Verification:**
```
"Search for all rules and lore about [world_element]"
"Find contradictory observations about [location/technology/culture]"
"Show all instances where [world_rule] is mentioned or applied"
```

---

## **Alternative Options**

### **Option 2: DuckDB-Based (High Performance)**
- **Server**: `@IzumiSy/mcp-duckdb-memory-server`  
- **Benefits**: Better performance for large projects, SQL querying
- **Use Case**: Epic-length works (100K+ words)

### **Option 3: Custom MCP Server**
If you need specialized functionality:
```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("DigitalMuseMemory")

@mcp.tool()
def analyze_character_arc(character_name: str) -> str:
    """Analyze character development across chapters"""
    # Custom logic for narrative analysis
    return analysis_result

@mcp.tool() 
def detect_plot_holes() -> str:
    """Identify potential continuity issues"""
    # Custom consistency checking logic
    return plot_issues
```

---

## **Best Practices**

### **Entity Naming:**
- Use underscores for multi-word names: `Sarah_Chen`
- Include type prefixes for clarity: `location_NeoTokyo`, `event_Chapter3_Betrayal`
- Maintain consistent naming conventions throughout project

### **Observation Granularity:**
- One fact per observation for better searchability
- Include chapter references: "Revealed in Chapter 5: [fact]"
- Separate physical, psychological, and narrative observations

### **Relation Consistency:**
- Always use active voice: "works_at" not "employed_by"  
- Create bidirectional relations when needed
- Update relations when story circumstances change

### **Memory Hygiene:**
- Regular cleanup of outdated observations
- Archive completed subplot entities
- Maintain separation between draft and final story elements

---

## **Integration Commands**

### **System Prompt Addition:**
```
You have access to a knowledge graph memory system. Always:
1. Query relevant entities before writing new content
2. Update the graph with new story information 
3. Check for consistency violations before proceeding
4. Use the graph to maintain character voices and world rules
```

### **Quality Gates:**
- **Before Chapter Sign-off**: Query graph for consistency
- **Before Phase Completion**: Full graph validation
- **Before Final Draft**: Comprehensive relationship audit

This knowledge graph system transforms your Digital Muse Protocol from a file-based workflow into a truly intelligent, memory-enabled writing system that can track and maintain consistency across complex narratives.