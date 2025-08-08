import { schema, Schema } from '@progress/kendo-angular-editor';
import { iframe } from './new-node';
import { tagMark } from './new-mark';
import { markButton } from './mark-button';
import { markSpan } from './mark-span';
import { Ps_UtilObjectService } from 'src/app/p-lib';

// Add the 'height' attribute to div node.
// let paragraph = { ...schema.spec.nodes.get('div') };
// paragraph.attrs['type'] = { default: null };
// paragraph.attrs['data-code'] = { default: null };

// let nodes = schema.spec.nodes.update('div', paragraph);
let image = { ...schema.spec.nodes.get('image') };
image.attrs = {
    ...image.attrs,
    type: { default: null },
    'data-code': { default: null }
  };

let nodes = schema.spec.nodes.update('image', image);

// Append the new node.
if (Ps_UtilObjectService.hasValue(nodes)) {
    nodes = nodes.addToEnd('iframe', <any>iframe);
    nodes = nodes.addToEnd('button', <any>markButton);
    nodes = nodes.addToEnd('span', <any>markSpan);//todo cái này ko được
}

// Append a new mark representing the <s> formatting tag.
const mark = tagMark('s');
const marks = schema.spec.marks.append(<any>mark);
// Create the new schema.
export const mySchema: Schema = new Schema({ nodes, marks });