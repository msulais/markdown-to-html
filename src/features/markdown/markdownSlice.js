import { createSlice } from "@reduxjs/toolkit";

export const markdownSlice = createSlice({
    name: 'markdown',
    initialState: {value: `# Welcome to the Markdown to HTML Editor!

This editor allows you to write Markdown text and instantly see the corresponding HTML output. Here are some examples of Markdown syntax:

## Headings

You can create headings by using hash symbols (#). The number of hash symbols indicates the level of the heading.

# Heading 1
## Heading 2
### Heading 3

## Emphasis

You can add emphasis to text using asterisks (*) or underscores (_).

*Italic*
**Bold**
_Italic_
__Bold__

## Lists

You can create ordered and unordered lists.

Unordered list:
- Item 1
- Item 2
- Item 3

Ordered list:
1. Item 1
2. Item 2
3. Item 3

## Links

You can create links using square brackets for the link text and parentheses for the URL.

[markdown to html](https://msulais.github.io/markdown-to-html)

## Images

You can add images using similar syntax as links, but with an exclamation mark (!) in front.

![Alt Text](https://loremflickr.com/320/240)

## Block Code

You can represent blocks of code using triple backticks (\`\`\`).

\`\`\`python
def greet(name):
    print(f"Hello, {name}!")
\`\`\`

## Inline Code

You can highlight inline code by enclosing it in single backticks (\`).

To install a package, use the \`pip install\` command.

## Tables

You can create tables using hyphens (-) for the header row and pipes (|) to separate columns.

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

## Blockquote

You can create blockquotes by using the greater-than symbol (>) at the beginning of a line.

> This is a blockquote.
>
> It can span multiple lines.

Feel free to modify this text and experiment with Markdown syntax. Enjoy editing!`},
    reducers: {
        setMarkdown: (state, action) => {state.value = action.payload}
    }
});

export const { setMarkdown } = markdownSlice.actions;
export default markdownSlice.reducer;