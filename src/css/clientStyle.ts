/**
 * The client stylesheet module
 * This module is responsible for loading the optional client `src/css/style.css` of the project.
 */

// Imported right after the base `style.css`, so client rules win on equal specificity.
// Eager glob resolves to nothing when the client has no stylesheet.
import.meta.glob("@client/css/style.css", { eager: true });
