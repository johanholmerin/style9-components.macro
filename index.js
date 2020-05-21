const { createMacro } = require('babel-plugin-macros');
const template = require('babel-template');
const t = require('@babel/types');

const buildComponent = template(`
props => {
  const styles = STYLE9.create({
    styles: STYLES
  });
  const Type = TYPE;

  return <Type
    style={DYNAMIC_STYLES}
    className={styles('styles')}
  >{props.children}</Type>;
}`, {
  plugins: ['jsx']
});

const buildImport = template(`import STYLE9 from 'style9';`, {
  sourceType: 'module'
});

function groupStyles(style) {
  const stat = [];
  const dynamic = [];

  for (const prop of style.properties) {
    if (
      t.isArrowFunctionExpression(prop.value) ||
      t.isFunctionExpression(prop.value)
    ) {
      dynamic.push(prop);
    } else {
      stat.push(prop);
    }
  }

  return { stat, dynamic };
}

function getDynamicStyles(props) {
  return t.objectExpression(
    props.map(({ key, value }) =>
      t.objectProperty(
        key,
        t.callExpression(value, [t.identifier('props')])
      )
    )
  );
}

function transformRef(ref, STYLE9) {
  const { stat, dynamic } = groupStyles(ref.node.arguments[0]);

  const STYLES = t.objectExpression(stat);
  const TYPE = t.stringLiteral(ref.node.callee.property.name);
  const DYNAMIC_STYLES = getDynamicStyles(dynamic);

  return buildComponent({ STYLES, DYNAMIC_STYLES, TYPE, STYLE9 });
}

function style9Components({ references, state, babel }) {
  if (!references.default) return;

  const program = references.default[0]
    .findParent(parent => parent.isProgram());
  const STYLE9 = program.scope.generateUidIdentifier('style9');
  program.unshiftContainer('body', buildImport({ STYLE9 }));
  program.scope.registerBinding('module', program.get('body.0'));

  for (const ref of references.default) {
    ref.parentPath.assertMemberExpression();
    const callExpression = ref.parentPath.parentPath;
    callExpression.assertCallExpression();

    callExpression.replaceWith(transformRef(callExpression, STYLE9));
  }
}

module.exports = createMacro(style9Components);
