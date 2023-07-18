import { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import beautiful from 'simply-beautiful';
import '../styles/Editor.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setMarkdown } from '../features/markdown/markdownSlice';
import { setCss } from '../features/css/cssSlice';

function Editor() {
    const markdown = useSelector((state) => state.markdown.value);
    const css = useSelector((state) => state.css.value);
    const dispatch = useDispatch();
    const textareaRef = useRef(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [outputText, setOutputText] = useState('');
    const [selectedTabInput, setSelectedTabInput] = useState('markdown'); // 'markdown' | 'css' | 'preview' | 'html'
    const [selectedTabOutput, setSelectedTabOutput] = useState('preview'); // 'preview' | 'html'
    let timeoutId = null;

    function onInput(){
        let textarea = textareaRef.current;
        if (!textarea) return;

        if (selectedTabInput === 'css'){
            // change css style
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                dispatch(setCss(textarea?.value ?? ''));
            }, 500);
            return;
        }

        if (selectedTabInput !== 'markdown') return;

        dispatch(setMarkdown(textarea?.value ?? ''));

        // convert markdown to html
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => setOutputText(marked.parse(textarea?.value ?? '')), 500);
    }

    useEffect(() => {
        let textarea = textareaRef.current;
        if (!textarea) return;

        textarea.value = markdown;
        setOutputText(marked.parse(markdown));

        setIsSmallScreen(window.matchMedia('(max-width: 750px)').matches);
        window.matchMedia('(max-width: 750px)').addEventListener('change', (match) => {
            setIsSmallScreen(match.matches);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isSmallScreen) return;

        setSelectedTabInput('markdown');
    }, [isSmallScreen]);

    useEffect(() => {
        let textarea = textareaRef.current;
        if (!textarea) return;

        // eslint-disable-next-line default-case
        switch (selectedTabInput){
            case 'markdown': textarea.value = markdown; break;
            case 'css': textarea.value = css; break;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTabInput]);

    return (<div className='e-editor'>
        <div className="e-input">
            <div className="center">
                <div className="e-tabbar">
                    <button onClick={() => {setSelectedTabInput('markdown')}} data-selected={selectedTabInput === 'markdown'? '' : undefined}>{selectedTabInput === 'markdown' && <span className='icon' translate='no'>done</span>} Markdown</button>
                    <button onClick={() => {setSelectedTabInput('css')}} data-selected={selectedTabInput === 'css'? '' : undefined}>{selectedTabInput === 'css' && <span className='icon' translate='no'>done</span>} CSS</button>
                    {
                        isSmallScreen &&
                        <>
                            <button onClick={() => {setSelectedTabInput('preview')}} data-selected={selectedTabInput === 'preview'? '' : undefined}>{selectedTabInput === 'preview' && <span className='icon' translate='no'>done</span>} Preview</button>
                            <button onClick={() => {setSelectedTabInput('html')}} data-selected={selectedTabInput === 'html'? '' : undefined}>{selectedTabInput === 'html' && <span className='icon' translate='no'>done</span>} HTML</button>
                        </>
                    }
                </div>
            </div>
            { ['markdown', 'css'].includes(selectedTabInput) && <textarea
                autoFocus
                ref={textareaRef}
                onInput={onInput}
                placeholder={selectedTabInput === 'markdown'? 'Type markdown here ...' : 'Type css here ...'}
                ></textarea>
            }
            { selectedTabInput === 'preview' && <iframe
                title='Markdown output'
                srcDoc={`<style>${css}</style>` + outputText}
                ></iframe>
            }
            { selectedTabInput === 'html' && <pre><code>{
                beautiful.html(outputText)
                }</code></pre>
            }
        </div>
        {
            !isSmallScreen &&
            <div className="e-output">
                <div className="center">
                    <div className="e-tabbar">
                        <button onClick={() => {setSelectedTabOutput('preview')}} data-selected={selectedTabOutput === 'preview'? '' : undefined}>{selectedTabOutput === 'preview' && <span className='icon' translate='no'>done</span>} Preview</button>
                        <button onClick={() => {setSelectedTabOutput('html')}} data-selected={selectedTabOutput === 'html'? '' : undefined}>{selectedTabOutput === 'html' && <span className='icon' translate='no'>done</span>} HTML</button>
                    </div>
                </div>
                { selectedTabOutput === 'preview' && <iframe
                    title='Markdown output'
                    srcDoc={`<style>${css}</style>` + outputText}
                    ></iframe>
                }
                { selectedTabOutput === 'html' && <pre><code>{
                    beautiful.html(outputText)
                    }</code></pre>
                }
            </div>
        }
    </div>);
}

export default Editor;