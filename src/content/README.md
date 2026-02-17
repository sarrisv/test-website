# ADMT Lab Data Format Documentation

This directory contains YAML data files for the Advanced Data Management Technologies Laboratory website. Each file follows a specific schema for consistent data structure and cross-referencing.

## File Overview

- **`people.yml`** - All lab members, collaborators, and alumni
- **`projects.yml`** - Research projects with team assignments and details
- **`courses.yml`** - Course offerings and instructor information

## Schema Specifications

### people.yml

Each person entry contains:

```yaml
- id: "unique-id"                      # Required: Lowercase, hyphenated
  fullname: "Full Name"                # Required: Complete name as desired
  shortname: "Display Name"            # Required: Shorter version for UI display
  roles: ["role1", "role2"]            # Required: Array of role types (see Role Values)
  department: "Department/Institution" # Required: Affiliation
  image: "filename.jpg"                # Required: Profile image filename
  biography: |                         # Optional: Full biography (supports Markdown)
    Biography text with [links](url)
  interests: ["Area 1", "Area 2"]      # Optional: Research interests array
  degrees:                             # Optional: For alumni, array of degrees earned
    - level: "phd"                     # Required if degrees exist: "phd", "ms", or "bs"
      title: "Thesis/Project Title"    # Required: Thesis or project title
      advisors: ["advisor-id"]         # Required: Array of advisor IDs (must match people.yml)
      month: 8                         # Required: Graduation month (1-12 integer)
      year: 2023                       # Required: Graduation year (integer)
```

**Role Values:**
- `faculty` - Lab faculty members
- `collaborator` - Active collaborating faculty
- `affiliated` - External affiliated researchers
- `former` - Former faculty/collaborators
- `alumni` - Graduated students
- `phd` - Current PhD students
- `ms` - Current MS students
- `bs` - Current BS students

**ID Format Rules:**
- Use lowercase letters and hyphens only
- Must be unique across all people

### projects.yml

Each project entry contains:

```yaml
- id: "project-id"                    # Required: Unique lowercase identifier
  link: true                          # Required: Boolean, true if project has dedicated page
  title: "Full Project Title"         # Required: Complete official title
  shortTitle: "Short Title"           # Required: Abbreviated name for UI
  shortDesc: "One sentence summary"   # Required: Brief description for cards/lists
  description: |                      # Required: Full description (supports Markdown)
    Multi-paragraph description 
    with [links](url).
    
    Additional paragraphs as needed.
  team:                               # Required: Team structure
    faculty:                          # Optional: Array of faculty
      - "person-id"                     # people in people.yml should be referenced by id 
      - "Person With No ID"             # people not in people.yml can be added via normal String
    collaborators: []                 # Optional: Array of collaborators
    gradStudents: []                  # Optional: Array of graduate students
    ugradStudents: []                 # Optional: Array of undergraduate students
  grants:                             # Optional: Array of funding sources
    - "Full grant description with [links](url)"
  links:                           # Optional: Array of related links
    - label: "Link Description"
      url: "https://example.com"
  press:                           # Optional: Array of press coverage
    - label: "Article Title"
      url: "https://news-url.com"
```


### courses.yml

Each course entry contains:

```yaml
- number: "CS1555/2055"             # Required: Course number(s)
  title: "Course Title"             # Required: Official course name
  status: "current"                 # Required: "current" or "previous"
  instructorIds:                    # Required: Array of current instructors
    - "person-id"                     # people in people.yml should be referenced by id 
    - "Person With No ID"             # people not in people.yml can be added via normal String
  previousInstructorIds: []         # Required: Array of past instructor IDs (can be empty)
  url: "https://course-url.com"     # Required: Link to course page/syllabus
```


## Data Relationships

### ID Consistency Rules

1. **Unique IDs**: Each person must have a unique `id` across the entire `people.yml` file
3. **Reference Validation**: All ID references must resolve to valid entries

## Example Data Flow

```
people.yml:
- id: "panos-chrysanthis"
  fullname: "Panos K. Chrysanthis"
  roles: ["faculty"]

projects.yml:
- id: "my-project"
  team:
    faculty: ["panos-chrysanthis"]  # ← References person ID

courses.yml:
- number: "CS1555"
  instructorIds: ["panos-chrysanthis"]  # ← References person ID
```