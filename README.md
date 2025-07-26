# The_tale

A collaborative writing platform that enables people to work together to create structured writings with full control over content, design, and organization.

## Features

- **Collaborative Writing**: Multiple contributors can work on the same writing
- **Flexible Content Structure**: Tree-based section organization with up to 3 levels
- **Rich Content Blocks**: Headers, paragraphs, images, lists, quotes, code blocks, and more
- **Visual Customization**: Custom colors and fonts for each writing
- **Reference Management**: Add external links and resources
- **Visibility Control**: Public or private writings
- **RESTful API**: Programmatic access to your writings

## Writing Management

### General Configuration
Each writing can be customized with:
- **Name**: The title of your writing
- **Description**: A brief overview of the content
- **Background**: Custom background image
- **Tags**: Categorization labels for organization

### Contributors
- Add contributors using their user ID
- Contributors can add sections and references
- Role-based permissions (owner vs. writer)

### Template Customization
- **Colors**: Customize the color scheme for light and dark themes
- **Fonts**: Choose custom fonts for headings and body text

### References
External links and resources can be added to each writing:
- Title/header for the reference
- URL link
- Description of the referenced content

### Visibility
- **Public**: Accessible to all users of The_tale
- **Private**: Only accessible via API with authentication

## Content Structure

### Sections
Content is organized in a tree structure of sections:
- Each section represents a different page/chapter
- Sections can have child sections (subsections)
- Sections can have sibling sections (same level)
- Maximum depth of 3 levels for optimal UX

### Section Names
- Must be unique within a writing
- Stored in lowercase (case-insensitive)
- Used for navigation and API access

### Content Blocks
Section content consists of various block types:
- **Header**: Different heading levels (H1-H4)
- **Paragraph**: Text content
- **Image**: Visual content with captions
- **List**: Ordered and unordered lists
- **Quote**: Blockquotes with attribution
- **Code**: Syntax-highlighted code blocks
- **Checklist**: Interactive task lists
- **Attachment**: File downloads
- **Space**: Visual spacing elements

## API Documentation

The_tale provides a RESTful API for programmatic access to your writings.

### Authentication
- Requires an API key as a Bearer token in the Authorization header
- API key can be generated and reset from your profile
- Each user can have only one active API key

### Endpoints

#### List Writings
```
GET /api/listwritings
```
Returns all writings owned by the authenticated user.

**Query Parameters:**
- `tags` (optional): Filter by tags (comma-separated)

**Example:**
```
GET /api/listwritings?tags=tech,altron
```

#### Get Writing
```
GET /api/getwriting/[id]
```
Returns detailed information for a specific writing.

**Parameters:**
- `id`: The writing ID

**Example:**
```
GET /api/getwriting/rpdq6lhe
```

#### Get Section
```
GET /api/getsection/[writingId]/[sectionName]
```
Returns the content of a specific section.

**Parameters:**
- `writingId`: The writing ID
- `sectionName`: The section name (case-insensitive)

**Example:**
```
GET /api/getsection/rpdq6lhe/api
```

### Response Codes
- `200`: Success
- `401`: Unauthorized (accessing writing you don't own)
- `403`: Forbidden (invalid or missing API key)
- `404`: Not found


## Technical Stack

### Backend
- **SvelteKit**: Full-stack framework
- **Vercel Postgres**: Database solution
- **Vercel Blob Storage**: File storage for images and attachments
- **Lucia**: Authentication system
- **Drizzle ORM**: Type-safe database queries

### Frontend
- **Svelte**: Reactive UI framework
- **TypeScript**: Type safety
- **Altron**: Rich text editor component
- **Custom UI Components**: Tailored user interface

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit).