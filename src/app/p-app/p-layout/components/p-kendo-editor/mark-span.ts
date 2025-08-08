const markSpan = {
    attrs: {
        class: { default: null },
        style: { default: null },
        type: {default: null},
        id: {default: null},
    },
    group: 'block',
    content: 'block*',
    parseDOM: [
        {
            tag: 'span',
            getAttrs: (dom: Element): any => ({
                style: dom.getAttribute('style'),
                class: dom.getAttribute('class'),
                type: dom.getAttribute('type'),
                id: dom.getAttribute('id'),
            }),
        },
    ],
    toDOM: (node: Node): Array<any> => {
        const attrs = {
            src: node['attrs'].src,
            class: node['attrs'].class,
            style: node['attrs'].style,
            type: node['attrs'].type,
            id: node['attrs'].id,
        };
        return ['span', attrs, 0];
    },
};

export { markSpan };