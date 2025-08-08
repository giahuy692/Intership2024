import { Node } from '@progress/kendo-angular-editor';

const iframe = {
    // NodeSpec interface
    // http://prosemirror.net/docs/ref/#model.NodeSpec
    attrs: {
        src: { default: null },
        style: { default: null },
        id: { default: null },
        class: { default: null },
        title: { default: null },
        height: { default: null },
        width: { default: null },
    },
    group: 'block',
    selectable: false,
    parseDOM: [ {
        tag: 'iframe',
        getAttrs: (dom: Element): unknown => ({
            src: dom.getAttribute('src'),
            style: dom.getAttribute('style')
        })
    } ],
    toDOM: (node: Node): Array<unknown> => {
        const attrs = {
            src: node.attrs.src,
            style: node.attrs.style,
            frameborder: '0',
            allowfullscreen: 'true',
            allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
        };
        return [ 'iframe', attrs ];
    }
};

export { iframe };