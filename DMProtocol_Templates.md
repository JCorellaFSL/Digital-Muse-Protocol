## **Digital Muse Protocol - Templates & Reusable Assets**

### **Purpose**
Standardized templates for consistent, high-quality implementation of the Digital Muse Protocol across all phases and domains.

---

## **Project Initialization Templates**

### **Master Roadmap Template**
```markdown
# [Project Title] - Digital Muse Protocol Implementation

## Project Parameters
- **Genre**: [Primary/Secondary genres]
- **Target Length**: [Word count goal]
- **Target Audience**: [Reader demographic and expectations]
- **Completion Timeline**: [Project deadline and milestones]
- **Quality Standards**: [Specific success criteria]

## Story Architecture  
- **Act 1**: [Chapters X-Y] - [Central conflict/theme]
- **Act 2**: [Chapters X-Y] - [Development/complications]  
- **Act 3**: [Chapters X-Y] - [Resolution/transformation]

## Knowledge Graph Architecture
- [ ] Single Graph (Simple) / [X] Federated System (Complex)
- **Master Graph**: Overall story coordination
- **Character Graph**: [Number] primary characters, [Number] supporting
- **World Graph**: [Number] primary locations, [Number] world systems
- **Plot Graph**: [Number] major events, [Number] subplots
- **Narrative Graph**: [Number] chapters, target pacing structure

## Phase Completion Status
- [ ] Phase 0: Pre-Project Planning (Target: [Date])
- [ ] Phase 1: Project Initialization (Target: [Date])
- [ ] Phase 2: World & Character Building (Target: [Date])
- [ ] Phase 3: Chapter Generation (Target: [Date])
- [ ] Phase 4: Quality Assurance (Target: [Date])

## Success Metrics
- **Consistency Score**: Target 95%+ character/world consistency
- **Anti-Generalization**: Target <5% generic language
- **Cross-Reference Integrity**: Target 98%+ valid references
- **Beta Reader Satisfaction**: Target positive feedback on [specific areas]
```

---

## **Character Development Templates**

### **Character Profile Template (Knowledge Graph)**
```javascript
// Character Entity Creation
"Create entity '[Character_Name]' in character_memory with type '[character_role]'"

// Core Identity
"Add observations to [Character_Name]: [
  'Age: [X], occupation: [specific job title]',
  'Fatal flaw: [specific psychological weakness that drives conflict]',
  'Core motivation: [what they want more than anything]',
  'Physical appearance: [specific, memorable details]',
  'Voice pattern: [how they speak - vocabulary, rhythm, verbal tics]'
]"

// Character Arc Framework
"Add observations to [Character_Name]: [
  'Starting state: [who they are at story beginning]',
  'Character arc: [starting_state] → [transformation] → [ending_state]',
  'Arc catalyst: [what forces the change]',
  'Internal conflict: [psychological struggle throughout story]'
]"

// Relationship Network
"Create relations: [Character_Name] → [relationship_type] → [Other_Character]"
"Create relations: [Character_Name] → [lives_in/works_at] → world_graph::[Location]"

// Cross-Domain References
"Add observation to [Character_Name]: 'Referenced in master: master_story::[relevant_act]'"
"Add observation to [Character_Name]: 'Key plot involvement: plot_graph::[major_event]'"
```

### **Character Consistency Checklist**
```markdown
## Character: [Name] - Consistency Validation

### Core Identity Consistency
- [ ] All dialogue reflects established voice pattern
- [ ] Actions align with established personality traits  
- [ ] Reactions consistent with established fatal flaw
- [ ] Motivation drives all major character decisions

### Physical Consistency
- [ ] Appearance descriptions match across all chapters
- [ ] Physical capabilities remain consistent
- [ ] Sensory details (how they move, gesture, etc.) maintained

### Relationship Consistency  
- [ ] Interactions with other characters reflect established dynamics
- [ ] Emotional responses appropriate to relationship history
- [ ] Character growth affects relationships realistically

### Arc Progression
- [ ] Character change follows logical progression
- [ ] Transformation events have proper setup and payoff
- [ ] Ending state feels earned based on journey
```

---

## **World Building Templates**

### **Location Profile Template (Knowledge Graph)**
```javascript
// Location Entity Creation
"Create entity '[Location_Name]' in world_memory with type '[location_type]'"

// Physical Description
"Add observations to [Location_Name]: [
  'Physical structure: [architecture, layout, notable features]',
  'Atmosphere: [mood, lighting, sounds, smells]',
  'Function: [what happens here, who uses it]',
  'Historical significance: [past events, cultural importance]',
  'Current state: [condition, occupancy, activity level]'
]"

// World Rules Integration
"Add observations to [Location_Name]: [
  'Technology level: [what tech exists here]',
  'Social rules: [customs, laws, behavioral expectations]',
  'Physical laws: [any special physics, magic systems, etc.]',
  'Access restrictions: [who can enter, security measures]'
]"

// Cross-Domain Integration
"Create relations: [Location_Name] → located_in → [Larger_Location]"
"Create relations: character_graph::[Character] → lives_in/works_at → [Location_Name]"
"Add observation to [Location_Name]: 'Featured in: plot_graph::[relevant_events]'"
```

### **World Rules Template**
```javascript
// System Entity Creation  
"Create entity '[System_Name]' in world_memory with type 'world_system'"

// System Mechanics
"Add observations to [System_Name]: [
  'Core principle: [how this system fundamentally works]',
  'Limitations: [what this system cannot do]',
  'Cost/consequence: [what using this system requires or causes]',
  'Detection: [how others know when this system is used]',
  'Countermeasures: [how this system can be defeated or bypassed]'
]"

// Story Integration
"Add observations to [System_Name]: [
  'Affects characters: [which characters can/must use this]',
  'Plot relevance: [how this drives or constrains story events]',
  'Conflict potential: [how this creates problems or solutions]'
]"
```

---

## **Plot Development Templates**

### **Plot Event Template (Knowledge Graph)**
```javascript
// Event Entity Creation
"Create entity '[Event_Name]' in plot_memory with type '[event_type]'"

// Event Details
"Add observations to [Event_Name]: [
  'Trigger: [what causes this event to happen]',
  'Key participants: [who is involved and their roles]', 
  'Location: world_graph::[where this happens]',
  'Stakes: [what characters stand to gain/lose]',
  'Outcome: [what changes as a result of this event]'
]"

// Causality Chain
"Create relations: [Previous_Event] → leads_to → [Event_Name]"
"Create relations: [Event_Name] → causes → [Consequence_Event]"

// Character Impact
"Create relations: [Event_Name] → involves → character_graph::[Character]"
"Add observation to [Event_Name]: 'Character impact: [how this changes involved characters]'"

// Timeline Integration  
"Add observation to [Event_Name]: 'Timeline: [when this occurs relative to other events]'"
"Add observation to [Event_Name]: 'Chapter placement: narrative_graph::[relevant_chapter]'"
```

### **Subplot Framework Template**
```javascript
// Subplot Entity Creation
"Create entity '[Subplot_Name]' in plot_memory with type 'subplot'"

// Subplot Structure
"Add observations to [Subplot_Name]: [
  'Central question: [what question drives this subplot]',
  'Primary characters: [who is most involved in this thread]',
  'Connection to main plot: [how this relates to primary story]',
  'Resolution method: [how this subplot concludes]'
]"

// Integration Points
"Add observations to [Subplot_Name]: [
  'Introduction: narrative_graph::[chapter where subplot begins]',
  'Development chapters: [list of chapters where subplot advances]', 
  'Resolution: narrative_graph::[chapter where subplot concludes]'
]"
```

---

## **Chapter Generation Templates**

### **Pre-Chapter Planning Template**
```markdown
## Chapter [Number]: [Title] - Planning Sheet

### Knowledge Graph Context Review
**Character States:**
- Query: "Search character_memory for [primary characters] current state and development needs"
- Results: [Key character information for this chapter]

**World Context:**
- Query: "Search world_memory for [chapter location] environmental details and rules"
- Results: [Setting information and world constraints]

**Plot Requirements:**
- Query: "Search plot_memory for events scheduled for this chapter"
- Results: [Plot events that must occur]

**Narrative Goals:**
- Query: "Search narrative_memory for chapter [X] pacing and thematic objectives"
- Results: [Pacing goals and theme development needs]

### Chapter Objectives
- **Primary Plot Goal**: [What plot event must occur]
- **Character Development Goal**: [How characters should change/grow]
- **World Building Goal**: [What world details should be revealed/established]
- **Pacing Goal**: [Tension level, scene count, approximate word count]
- **Theme Development**: [What thematic elements should be woven in]

### Anti-Generalization Checklist
- [ ] Character reactions grounded in established personality traits
- [ ] World details specific and sensory-rich
- [ ] Dialogue reflects individual character voice patterns
- [ ] Plot events have clear cause-effect relationships
- [ ] Emotional responses specific to character and situation
```

### **Post-Chapter Update Template**
```javascript
// Narrative Progress Update
"Update narrative_memory chapter_[X]: [
  'Status: Completed',
  'Final word count: [actual count]',
  'Themes covered: [themes that appeared in chapter]',
  'Pacing achieved: [tension level, scene breakdown]'
]"

// Character Development Updates
"Add observations to character_graph::[Character]: [
  'Chapter [X]: [specific character development that occurred]',
  'New traits revealed: [any new personality aspects shown]',
  'Relationship changes: [how relationships evolved]'
]"

// World Building Updates
"Add observations to world_graph::[Location/System]: [
  'Chapter [X] details: [new world information revealed]',
  'Rules demonstrated: [world rules that were shown in action]'
]"

// Plot Progress Updates
"Update plot_graph::[Event]: [
  'Status: Completed in Chapter [X]',
  'Outcome: [actual result of the event]',
  'Consequences set up: [what this enables for future chapters]'
]"
```

---

## **Quality Control Templates**

### **Anti-Generalization Review Template**
```markdown
## Chapter [X] - Anti-Generalization Review

### Generic Language Detection
**Search Patterns:**
- [ ] Vague emotions: "felt sad/happy/angry" without specific manifestation
- [ ] Abstract concepts: "justice/freedom/destiny" without concrete anchoring
- [ ] Passive constructions: "it was done/things happened" without agency
- [ ] Absolute statements: "always/never/everyone" without qualification

**Replacement Strategy:**
- Generic: "[Original text]"
- Specific: "[Revised text with concrete details]"
- Justification: "[Why this revision is more effective]"

### Character Voice Validation
**Character: [Name]**
- [ ] Dialogue vocabulary matches established pattern
- [ ] Sentence structure reflects character education/background
- [ ] Emotional expressions align with established personality
- [ ] Technical language usage consistent with character expertise

### Sensory Anchoring Check
- [ ] Visual details: Specific colors, shapes, lighting conditions
- [ ] Auditory details: Specific sounds, volumes, tones
- [ ] Tactile details: Textures, temperatures, physical sensations
- [ ] Olfactory/Gustatory: Smells and tastes when relevant
- [ ] Kinesthetic: Movement, gesture, spatial relationships
```

### **Cross-Domain Consistency Template**
```javascript
// Character Consistency Audit
"Search all graphs for references to [Character_Name] - verify alignment"
"Check character actions in Chapter [X] against established personality in character_graph"
"Validate character relationships shown match established dynamics"

// World Consistency Audit  
"Search all graphs for references to [Location/System] - check for contradictions"
"Verify world rules applied in Chapter [X] match established systems in world_graph"
"Confirm physical descriptions align with established environment details"

// Plot Consistency Audit
"Trace cause-effect chain for events in Chapter [X] against plot_graph timeline"
"Verify character motivations driving Chapter [X] events match established goals"
"Check that Chapter [X] consequences set up properly in plot_graph"

// Timeline Consistency Audit
"Cross-reference Chapter [X] events with master_story chronology"
"Verify character development pace aligns with overall arc timeline"
"Confirm world state changes follow logical progression"
```

---

## **Knowledge Graph Maintenance Templates**

### **Entity Creation Template**
```javascript
// Standard Entity Pattern
"Create entity '[Descriptive_Name]' in [appropriate_graph] with type '[specific_type]'"

// Observation Guidelines
"Add observations to [Entity_Name]: [
  '[One specific fact per observation]',
  '[Include cross-references when relevant: graph_name::entity_name]',
  '[Maintain consistent tense and voice]',
  '[Focus on story-relevant details]'
]"

// Relationship Creation
"Create relation: [Entity_A] → [specific_relationship_type] → [Entity_B]"
// Use active voice: "works_at" not "employed_by"
// Be specific: "mentors" not "knows"
```

### **Graph Hygiene Template**
```markdown
## Weekly Knowledge Graph Maintenance

### Cleanup Tasks
- [ ] Remove outdated observations from completed subplot entities
- [ ] Archive resolved conflict entities to reduce active graph size
- [ ] Update cross-references that may have changed with story development
- [ ] Consolidate redundant entities with similar functions

### Validation Tasks
- [ ] Verify all cross-references (graph_name::entity_name) still resolve
- [ ] Check for orphaned entities with no relationships
- [ ] Confirm all major characters/locations/events have sufficient observations
- [ ] Validate relationship consistency (bidirectional where appropriate)

### Optimization Tasks
- [ ] Break down oversized entities into focused sub-entities
- [ ] Add missing relationships between related entities
- [ ] Enhance observations for entities frequently queried
- [ ] Update entity types for better categorization and search
```

### **Backup and Recovery Template**
```bash
#!/bin/bash
# Knowledge Graph Backup Script Template

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="backups/kg_backup_$DATE"
mkdir -p $BACKUP_DIR

# Backup all knowledge graph files
cp book/memory/*.json $BACKUP_DIR/

# Create backup manifest
echo "Backup created: $DATE" > $BACKUP_DIR/manifest.txt
echo "Files backed up:" >> $BACKUP_DIR/manifest.txt
ls -la book/memory/*.json >> $BACKUP_DIR/manifest.txt

# Compress backup
tar -czf $BACKUP_DIR.tar.gz $BACKUP_DIR/
rm -rf $BACKUP_DIR/

echo "Knowledge Graph backup completed: $BACKUP_DIR.tar.gz"
```

---

## **Troubleshooting Templates**

### **Consistency Issue Resolution Template**
```markdown
## Consistency Issue: [Description]

### Problem Identification
- **Issue Type**: Character/World/Plot/Timeline inconsistency
- **Affected Chapters**: [List chapters where inconsistency appears]
- **Graph Domains**: [Which knowledge graphs contain conflicting information]

### Root Cause Analysis
- **Original Correct Information**: [What should be true]
- **Conflicting Information**: [What contradicts the original]
- **Likely Cause**: [How the inconsistency was introduced]

### Resolution Strategy
1. **Graph Updates Required**:
   - [ ] Update [graph_name] entity [entity_name] with correct information
   - [ ] Remove/modify conflicting observations
   - [ ] Add cross-references to prevent future conflicts

2. **Chapter Revisions Required**:
   - [ ] Chapter [X]: [Specific changes needed]
   - [ ] Chapter [Y]: [Specific changes needed]

3. **Prevention Measures**:
   - [ ] Add validation queries to prevent similar issues
   - [ ] Enhance cross-reference network for early detection
   - [ ] Update review checklist to catch this type of error
```

### **Creative Block Resolution Template**
```markdown
## Creative Block: [Scene/Chapter/Plot Point]

### Knowledge Graph Consultation
**Character Motivations:**
- Query: "Search character_memory for [relevant characters] motivations and conflicts"
- Results: [What drives these characters in this situation]

**World Constraints:**
- Query: "Search world_memory for [relevant location/system] rules and possibilities"
- Results: [What options/limitations exist in this context]

**Plot Requirements:**
- Query: "Search plot_memory for events that must occur and existing setup"
- Results: [What story elements are already established]

### Creative Constraint Utilization
- **Established Relationships**: [How can existing character dynamics create conflict/resolution]
- **World System Interactions**: [How can established world rules create unexpected solutions]
- **Plot Thread Convergence**: [How can separate subplots intersect meaningfully]

### Resolution Strategies
1. **Character-Driven**: [Let established personality traits drive the scene]
2. **World-Driven**: [Let established world rules create complications]
3. **Plot-Driven**: [Let established cause-effect chain suggest next event]
4. **Theme-Driven**: [Let established themes suggest symbolic resolution]
```

---

## **Template Usage Guidelines**

### **Customization Principles**
- **Adapt to Genre**: Modify templates for fantasy/sci-fi/contemporary specific needs
- **Scale to Complexity**: Use simplified versions for shorter works, full versions for novels
- **Team Coordination**: Standardize templates across collaborative projects
- **Tool Integration**: Adjust templates based on AI client capabilities

### **Implementation Best Practices**
- **Start Simple**: Begin with basic templates, add complexity as needed
- **Maintain Consistency**: Use templates consistently across entire project
- **Regular Updates**: Refine templates based on project experience
- **Document Changes**: Track template modifications for future projects

### **Quality Metrics**
- **Template Usage**: 90%+ of protocol tasks use appropriate templates
- **Consistency Improvement**: Templates reduce variation in quality/format
- **Efficiency Gains**: Templates reduce time spent on routine protocol tasks
- **Error Reduction**: Templates prevent common implementation mistakes

**These templates transform the Digital Muse Protocol from a methodology into a practical, implementable system with consistent, professional-grade results.**