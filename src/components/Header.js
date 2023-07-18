/* eslint-disable default-case */
import { useSelector } from 'react-redux';
import { marked } from 'marked';
import beautiful from 'simply-beautiful';
import '../styles/Header.scss';
import { useEffect } from 'react';

function Header(){
    const markdown = useSelector(state => state.markdown.value);
    const css = useSelector(state => state.css.value);

    /**
     * @param {'markdown' | 'html' | 'css'} type
     */
    function copy(type){
        let text = '';
        switch (type){
            case 'markdown': text = markdown; break;
            case 'css'     : text = css; break;
            case 'html'    : text = beautiful.html(marked.parse(markdown)); break;
        }

        navigator.clipboard.writeText(text);
    }

    /**
     * @param {'markdown' | 'html' | 'css'} type
     */
    function download(type){
        let text = '';
        let ext = '';
        switch (type){
            case 'markdown':
                text = markdown;
                ext = 'md';
                break;
            case 'css':
                text = css;
                ext = 'css';
                break;
            case 'html':
                text = beautiful.html(
                    '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Markdown to html</title><style>'
                    + css
                    + '</style></head><body>'
                    + marked.parse(markdown)
                    + '</body></html>'
                );
                ext = 'html';
                break;
        }

        const blob = new Blob([text], { type: 'text/' + type });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "markdown-to-html." + ext;

        link.click();

        URL.revokeObjectURL(url);
    }

    useEffect(() => {
        for (let copyBtn of document.querySelectorAll('.h-menu-copy > button')){
            let timeoutId;
            let previousTextContent = copyBtn.textContent;
            copyBtn.addEventListener('click', ev => {
                let text = '';
                switch (copyBtn.getAttribute('data-type')){
                    case 'markdown': text = markdown; break;
                    case 'css'     : text = css; break;
                    case 'html'    : text = beautiful.html(marked.parse(markdown)); break;
                }

                navigator.clipboard.writeText(text).then(_ => {
                    copyBtn.textContent = 'Copied • ' + previousTextContent;
                    if (timeoutId) clearTimeout(timeoutId);

                    timeoutId = setTimeout(() => {
                        copyBtn.textContent = previousTextContent;
                        timeoutId = null;
                    }, 2000);
                });
            });
        }
    });

    return (<header className='h-header'>
        <div className='h-name'>
            <h1>MARKDOWN</h1>
            <p>TO HTML</p>
        </div>
        <div className="h-actions">
            <div className='h-menu'>
                <button title='Copy'>
                    <span className="icon" translate='no'>content_copy</span>
                </button>
                <div className='h-menu-items h-menu-copy' style={{right: '-96px'}}>
                    <p><span className="icon" translate='no'>content_copy</span>Copy</p>
                    <button data-type="markdown">Markdown</button>
                    <button data-type="html">HTML</button>
                    <button data-type="css">CSS</button>
                </div>
            </div>
            <div className='h-menu'>
                <button title='Download'>
                    <span className="icon" translate='no'>download</span>
                </button>
                <div className='h-menu-items' style={{right: '-48px'}}>
                    <p><span className="icon" translate='no'>download</span>Download</p>
                    <button onClick={() => download('markdown')}>Markdown</button>
                    <button onClick={() => download('html')}>HTML</button>
                    <button onClick={() => download('css')}>CSS</button>
                </div>
            </div>
            <div className='h-menu'>
                <button title='Help'>
                    <span className="icon" translate='no'>info</span>
                </button>
                <div className='h-menu-items'>
                    <p><span className="icon" translate='no'>info</span>Info</p>
                    <a target="_blank" rel="noopener noreferrer" href='https://github.com/msulais/markdown-to-html'>Source code (Github)</a>
                    <p className='h-copyright'>© {new Date().getFullYear()} Muhammad Sulais</p>
                </div>
            </div>
        </div>
    </header>);
}

export default Header;