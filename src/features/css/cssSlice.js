import { createSlice } from "@reduxjs/toolkit";

export const cssSlice = createSlice({
    name: 'css',
    initialState: {value: `:is(p, div, li, th, td) {
    font-size: 18px
}
:not(pre) code {
    color: #7c5800;
    font-size: 0.92em
}
pre > code {
    color: #c9d1d9;
    border-radius: 24px;
    padding: 32px;
    display: block;
    overflow: auto;
    font-size: 16px;
    background-color: #0d1117
}
a {
    text-decoration: underline;
    transition: all 0.25s;
    color: #2e6b27
}
a:hover {
    text-decoration: none;
    padding: 0 4px;
    background-color: #aff49f;
    color: #002201
}
img {
    display: block;
    width: 100%;
    max-width: 100%;
    border-radius: 32px
}
h1 {
    font-size: 48px;
    font-weight: normal
}
h2 {
    font-size: 40px;
    font-weight: normal
}
h3 {
    font-size: 32px;
    font-weight: normal
}
h4 {
    font-size: 24px;
    font-weight: bolder
}
:is(* :is(h1, h2, h3, h4)) + :is(h1, h2, h3, h4) {
    padding-top: 0
}
:is(ul, ol) {
    margin-left: 16px;
}
blockquote {
    padding: 8px 16px;
    margin: 0;
    border-left: 4px solid #2e6b27;
    display: flex;
    flex-direction: column;
    gap: 24px;
}
table {
    border: 1px solid #73796e;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 24px;
    margin-top: 16px;
    width: fit-content;
    overflow-y: auto;
    vertical-align: top;
}
th {
    background-color: #ffdea7;
    color: #271900;
    border: none;
    padding: 16px;
    text-align: center;
}
th:first-child {
    border-bottom: 1px solid #73796e;
    border-radius: 24px 0 0 0;
    border-right: 1px solid #73796e;
}
th:nth-child(n+1) {
    border-bottom: 1px solid #73796e;
    border-right: 1px solid #73796e;
}
th:last-child {
    border-bottom: 1px solid #73796e;
    border-right: none;
    border-radius: 0 24px 0 0;
}
th :is(code, code *) {
    color: #271900;
}
td {
    border: none;
    border-bottom: 1px solid #73796e;
    border-right: 1px solid #73796e;
    padding: 16px;
    vertical-align: top;
}
td:last-child {
    border-bottom: 1px solid #73796e;
    border-right: none;
}
tr:last-child td {
    border-bottom: none;
}`},
    reducers: {
        setCss: (state, action) => {state.value = action.payload}
    }
});

export const { setCss } = cssSlice.actions;
export default cssSlice.reducer;