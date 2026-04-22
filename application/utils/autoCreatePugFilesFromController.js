// const fs = require("fs");
// const path = require("path");
// const parser = require("@babel/parser");
// const traverse = require("@babel/traverse").default;

// /**
//  * Automatically detects Pug template paths inside a controller object
//  * using AST parsing and creates missing Pug files without overwriting.
//  * 
//  * @param {object} controllerObj
//  * @param {string} baseDir
//  */
// function autoCreatePugFilesFromController(controllerObj, baseDir) {
//   Object.values(controllerObj).forEach((fn) => {
//     if (typeof fn !== "function") return;

//     const fnStr = fn.toString();
//     let ast;
//     try {
//       ast = parser.parse(`(${fnStr})`, {
//         sourceType: "module",
//         plugins: ["jsx", "classProperties", "asyncGenerators"],
//       });
//     } catch (err) {
//       console.error("Failed to parse function:", err);
//       return;
//     }

//     const pugPaths = new Set();

//     traverse(ast, {
//       CallExpression(pathNode) {
//         const callee = pathNode.node.callee;
//         if (
//           callee.type === "Identifier" &&
//           callee.name === "renderPage" &&
//           pathNode.node.arguments.length > 1
//         ) {
//           const arg = pathNode.node.arguments[1];
//           if (arg.type === "StringLiteral" && arg.value.endsWith(".pug")) {
//             pugPaths.add(arg.value);
//           }
//         }
//       },
//     });

//     pugPaths.forEach((relativePath) => {
//       const fullPath = path.join(baseDir, relativePath);
//       const dir = path.dirname(fullPath);

//       if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
//       if (!fs.existsSync(fullPath))
//         fs.writeFileSync(fullPath, `//- ${path.basename(fullPath)}\n`, "utf8");

//       console.log(`Created Pug: ${fullPath}`);
//     });
//   });
// }

// module.exports = autoCreatePugFilesFromController;
