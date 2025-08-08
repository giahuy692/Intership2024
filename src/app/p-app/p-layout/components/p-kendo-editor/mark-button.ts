const markButton = {
    attrs: {
        class: { default: null },
        style: { default: null },
        type: { default: null },
        id: { default: null },
        height: { default: null },
        width: { default: null },
    },
    group: 'block',
    content: 'block*',
    parseDOM: [
        {
            tag: 'button',
            getAttrs: (dom: Element): any => ({
                style: dom.getAttribute('style'),
                class: dom.getAttribute('class'),
                type: dom.getAttribute('type'),
                id: dom.getAttribute('id'),
                height: dom.getAttribute('height'),
                width: dom.getAttribute('width'),
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
            height: node['attrs'].height,
            width: node['attrs'].width,
        };
        return ['button', attrs, 0];
    },
};

export { markButton };