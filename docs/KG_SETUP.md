# Knowledge Graph Memory Setup

**Essential guide for implementing persistent memory in your Digital Muse Protocol projects**

---

## 🎯 Overview

Knowledge Graphs (KGs) serve as the "memory" of your AI writing project, preventing the critical issues of forgotten characters, inconsistent world rules, and generic prose that plague traditional AI writing.

### Key Benefits
- **Perfect Memory**: AI remembers every character trait, world rule, and plot thread
- **Consistency Enforcement**: Automatic validation prevents contradictions
- **Anti-Generalization**: Specific details prevent vague, generic prose
- **Cross-Session Continuity**: Resume writing with full context intact

---

## 🚀 Quick Setup (5 Minutes)

### Option 1: Simple Single Graph (Recommended for Beginners)

**Step 1: Create Project Memory Directory**
```bash
mkdir -p ./book/memory
```

**Step 2: Configure MCP Memory Server**
Add this to your AI client's MCP configuration:

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
        "delete_entities",
        "delete_observations",
        "delete_relations",
        "read_graph",
        "search_nodes",
        "open_nodes"
      ]
    }
  }
}
```

**Step 3: Restart Your AI Client**
Your knowledge graph is now ready!

---

## 📊 Knowledge Graph Structure

### Entity Types
- **Characters**: `protagonist`, `antagonist`, `supporting_character`, `minor_character`
- **Locations**: `setting`, `landmark`, `region`, `building`
- **Organizations**: `faction`, `company`, `government`, `group`
- **Plot Elements**: `event`, `conflict`, `mystery`, `subplot`, `goal`
- **World Building**: `rule`, `technology`, `culture`, `history`, `system`

### Relation Types
- **Character Relations**: `knows`, `related_to`, `opposes`, `loves`, `fears`, `works_with`
- **Location Relations**: `located_in`, `connects_to`, `owned_by`, `hidden_in`
- **Plot Relations**: `causes`, `resolves`, `precedes`, `involves`, `prevents`
- **Narrative Relations**: `appears_in_chapter`, `introduced_in`, `arc_belongs_to`

### Observation Categories
- **Physical**: Appearance, abilities, limitations, distinctive features
- **Psychological**: Motivations, fears, personality traits, character voice
- **Historical**: Background events, relationships, past experiences
- **Narrative**: Chapter appearances, story function, character arc progress

---

## 🛠️ Implementation Workflow

### Phase 1: Character Creation
```javascript
// Example: Creating your protagonist
{
  "entities": [
    {
      "name": "Sarah_Chen",
      "entityType": "protagonist", 
      "observations": [
        "Age 32, cybersecurity expert with MIT background",
        "Fatal flaw: trusts technology over human intuition",
        "Core motivation: Prevent AI uprising she accidentally enabled",
        "Voice: Technical jargon mixed with self-doubt and dry humor",
        "Appearance: Short black hair, always wears vintage band t-shirts"
      ]
    }
  ]
}
```

### Phase 2: World Building Integration
```javascript
// Example: Creating interconnected world elements
{
  "entities": [
    {
      "name": "NeoTokyo_2087",
      "entityType": "setting",
      "observations": [
        "Cyberpunk metropolis with holographic advertisements",
        "Corporate towers pierce perpetual smog layer at 500m",
        "Underground resistance operates in abandoned subway tunnels",
        "Population: 47 million, 23% are AI-enhanced humans"
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

### Phase 3: Chapter-by-Chapter Updates
```javascript
// After each chapter, add new developments
{
  "observations": [
    {
      "entityName": "Sarah_Chen",
      "contents": [
        "Discovered mentor's betrayal in Chapter 3 - felt physically sick",
        "Acquired neural implant hacking device from black market",
        "Now suspects corporate conspiracy reaches government level",
        "Relationship with Marcus: growing trust despite initial suspicion"
      ]
    }
  ]
}
```

---

## 📝 Writing Workflow Integration

### Pre-Chapter Planning
Before writing each chapter, query your knowledge graph:

1. **"Search for all entities related to [current scene location]"**
   - Get complete context for the setting
   - Remember established details and rules

2. **"Show me all observations about [character name]"**
   - Review personality traits and current status
   - Ensure consistent voice and behavior

3. **"Find all relations involving [plot element]"**
   - Check interconnected plot threads
   - Maintain narrative consistency

### During Writing
Use specific KG queries to enhance your prose:

- **Generic**: "The character felt sad"
- **KG-Enhanced**: Query Sarah_Chen → "Sarah's jaw clenched the way it always did when she felt betrayed, her fingers automatically seeking the comfort of her vintage Nirvana shirt"

### Post-Chapter Updates
After completing each chapter:

1. **Add new observations** for character development
2. **Create new entities** for introduced elements
3. **Update relations** based on changed dynamics
4. **Cross-reference** with existing plot threads

---

## ✅ Quality Control with KGs

### Anti-Generalization Checking
Use your KG to catch and fix generic language:

**Bad**: "She was angry"
**Query KG**: What are Sarah_Chen's specific anger expressions?
**Good**: "Sarah's fingers drummed against her laptop in sharp staccato bursts - her tell when technical problems made her feel helpless"

### Consistency Validation
Regular consistency checks using KG queries:

- **Character Voice**: Does this dialogue match established speech patterns?
- **World Rules**: Does this action violate established technology limitations?
- **Plot Logic**: Does this event align with previously established causality?
- **Timeline**: Are all events in proper chronological order?

---

## 🎨 Example Project Structure
```
My Novel Project/
├── book/
│   ├── memory/
│   │   └── dm_protocol_memory.json  # ← Your knowledge graph database
│   ├── characters/
│   │   ├── protagonist.md
│   │   └── supporting_cast.md
│   ├── world/
│   │   ├── locations.md
│   │   └── technology.md
│   ├── plots/
│   │   └── main_arc.md
│   └── chapters/
│       ├── chapter_01.md
│       └── chapter_02.md
├── ROADMAP.md
└── README.md
```

---

## 🆘 Troubleshooting

### Knowledge Graph Not Loading
1. **Check file path**: Ensure `./book/memory/` directory exists
2. **Restart AI client**: MCP servers require restart to reconnect
3. **Verify autoapprove settings**: Add all necessary permissions

### Memory Not Persisting
1. **Check write permissions**: Ensure directory is writable
2. **Verify JSON validity**: Corrupted JSON files cause failures
3. **Check file size**: Very large graphs (>10MB) may need optimization

### Inconsistent Results
1. **Regular validation**: Run consistency checks every 3-5 chapters
2. **Update observations**: Keep character development current
3. **Cross-reference relations**: Ensure all connections are bidirectional

---

## 🚀 Ready for Advanced Features?

Once you're comfortable with basic KG setup, consider upgrading to:
- **[Advanced Federated Architecture](KG_ADVANCED.md)** - Multiple specialized graphs
- **[Quality Control Integration](DMProtocol_QualityControl.md)** - Systematic validation
- **[Team Collaboration](DMProtocol_Troubleshooting.md)** - Multi-writer workflows

**Your knowledge graph is now the persistent memory that will transform your AI writing from generic to specific, inconsistent to reliable, and forgettable to unforgettable.**