module.exports = (plop) => {
  // create your generators here
  plop.setGenerator("basics", {
    description: "This is a skeleton component generator",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name: ",
      }
    ],
    actions: [
      {
        type: "addMany",
        destination: "src/components/{{pascalCase name}}",
        base: "plop-templates/component",
        templateFiles: "plop-templates/component/**",
      }
    ],
  });
}