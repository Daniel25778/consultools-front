export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Wrap JSX string attributes with {""}'
    },
    fixable: 'code',
    schema: []
  },

  create(context) {
    return {
      JSXAttribute(node) {
        if (!node.value) return;

        // Só mexe em props = "string"
        if (node.value.type === 'Literal' && typeof node.value.value === 'string') {
          const raw = node.value.raw; // "texto"
          context.report({
            node: node.value,
            message: 'Strings em props devem usar {"texto"}',
            fix(fixer) {
              return fixer.replaceText(node.value, `{${raw}}`);
            }
          });
        }
      }
    };
  }
};
