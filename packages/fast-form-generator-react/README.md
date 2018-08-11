# Schema form generator
The schema form generator has a default export `Form` component which takes a JSON schema and converts it into a form element.

## Installing
`npm i --save @microsoft/fast-form-generator-react`

## Importing to a file
```jsx
import Form from "@microsoft/fast-form-generator-react";
```

## Usage
- [Uncontrolled](./README.md#uncontrolled)
- [Editing (Updating data)](./README.md#editing)
- [Controlled](./README.md#controlled)
- [Custom children](./README.md#custom-children)
- [Using layout components](./README.md#using-layout-components)
- [Add categories](./README.md#add-categories)
- [Customize input attributes](./README.md#customize-input-attributes)
- [Writing schemas](./README.md#writing-schemas)

## Uncontrolled
An uncontrolled implementation of the `Form` allows the `Form` to control it's own navigation. This is the most basic implementation.

Example:
```jsx
<Form
    data={componentData}
    schema={componentSchema}
/>
```

Required props:
- `data` - The components data
- `schema` - The components schema

## Editing
Live editing can be achieved by using the `onChange` prop which will fire a change event with a full set of updated component data.

Example:
```jsx
<Form
    data={this.state.componentData}
    schema={componentSchema}
    onChange={this.handleChange}
/>
```

Example `onChange` handler:
```jsx
handleChange = (updatedComponentData) => {
    this.setState({
        componentData: updatedComponentData
    });
}
```

## Controlled
If the `location` prop is passed the `Form` becomes controlled and all navigation must be handled.

If there are sections created via `children`, `array` or `object`s, this allows these sections to be navigated to outside of the `Form` components control.

Example:
```jsx
<Form
    data={this.state.componentData}
    schema={componentSchema}
    location={{
        schemaLocation: this.state.schemaLocation,
        dataLocation: this.state.dataLocation,
        onChange: this.handeLocationOnChange
    }}
/>
```

Example location `onChange` handler:
```jsx
handeLocationOnChange = (updatedSchemaLocation, updatedDataLocation) => {
    this.setState({
        schemaLocation: updatedSchemaLocation,
        dataLocation: updatedDataLocation
    });
}
```

## Custom children
As an extension to the JSON schema format, an additional property declaration of "reactProperties" can be added to an object and an additional type of "children" can be used. This additional type can also optionally restrict React components that can be used as children in the component by their schema id, if this is not specified all passed `childOptions` are allowed as children.

The `childOptions` array, enumerates the potential React components which can be children. By default the only allowed children is a text element.

Example:
```jsx
<Form
    data={this.state.componentData}
    schema={componentSchema}
    childOptions={[
        {
            name: "Button",
            component: Button,
            schema: ButtonSchema
        }
    ]}
/>
```

Example component schema which can have any children as options:
```json
{
    "$schema": "http://json-schema.org/schema#",
    "id": "example-component",
    "type": "object",
    "properties": {
        "text": {
            "type": "string"
        }
    },
    "reactProperties": {
        "children": {
            "type": "children"
        }
    }
}
```

Restricted children example:
```json
"reactProperties": {
    "children": {
        "type": "children",
        "id": [
            "button"
        ]
    }
}
```

When returning data the properties will have to be mapped to a child.

Data returned from `onChange`:
```json
{
    "text": "Foo",
    "children": [
        {
            "id": "button",
            "props": {
                "text": "Bar"
            }
        }
    ]
}
```

## Using layout components
Other input controls are available for a more user friendly interface. This can be achieved by passing `componentMappingToPropertyNames` which will map a layout component to a property name. You can map them to one or more different property names.

Example of mapping the `alignHorizontal` layout component to multiple property names:

```jsx
<Form
    data={this.state.componentData}
    schema={componentSchema}
    componentMappingToPropertyNames={{
        alignHorizontal: [
            "alignHorizontalSpacingForTitle",
            "alignHorizontalSpacingForImage"
        ]
    }}
/>
```

### Available layout components
#### Align horizontal
This must be mapped to a property with type `string` and the `enum` modifier with string values "left", "center", "right".

#### Align vertical
This must be mapped to a property with type `string` and the `enum` modifier with string values "top", "center", "bottom".

#### Theme
This must be mapped to a property with type `string` and the `enum` modifier with string values "dark" & "light".

## Add categories
The `orderByPropertyNames` can sort properties into categories and give them weight which provides more granular control of their sorting within the category.

Example of displaying properties related to content on top of properties which relate to formatting:

*This also tells the form generator to only display categories once there are 4 or more and gives a default category weight*

```jsx
<Form
    data={this.state.componentData}
    schema={componentSchema}
    orderByPropertyNames={{
        showCategoriesAtPropertyCount: 4,
        defaultCategoryWeight: 20,
        categories: [
            {
                title: "Content",
                weight: 50,
                properties: [
                    { weight: 5, propertyName: ["title, text"] },
                    { weight: 0, propertyName: "details" }
                ]
            },
            {
                title: "Formatting",
                weight: 40,
                properties: [
                    { weight: 9, propertyName: "alignVertical" },
                    { weight: 7, propertyName: "alignHorizontal" }
                ]
            }
        ]
    }}
/>
```

## Customize input attributes
The attributes of a form item can be adjusted by `attributeSettingsMappingToPropertyNames` which maps an attribute of a layout component or default form component to a property name.

Example of updating the textarea row to be 1 when the property name is `text`:

```jsx
<Form
    data={this.state.componentData}
    schema={componentSchema}
    attributeSettingsMappingToPropertyNames={{
        textarea: {
            rows: [
                {
                    propertyNames: ["text"],
                    value: 1
                }
            ]
        }
    }
/>
```

## Writing JSON Schemas
The schema form generator can interpret most [JSON schemas](http://json-schema.org/), however there are some things to note when writing JSON schemas that make for a better UI.

### title
Using a title will add a label to the left or top of the corresponding form element. All properties are required to have a title.

Example:
```
{
    "$schema": "http://json-schema.org/schema#",
    "id": "my-component",
    "title": "My component",
    "type": "object",
    "properties": {
        "text": {
            "title": "Text",
            "type": "string",
            "example": "Hello world"
        },
        "weight": {
            "title": "Weight",
            "type": "string",
            "enum": [
                "heavy"
            ]
        }
    },
    "required": [
        "text"
    ]
}
```

### examples & default
Providing an example or default value will replace the placeholder 'example text' or randomly generated number. It is generally better to add this extra information in case the schema form generator needs to create a new set of data.

Example:
```
{
    "$schema": "http://json-schema.org/schema#",
    "id": "my-component",
    "title": "My component",
    "type": "object",
    "properties": {
        "text": {
            "title": "Text",
            "type": "string",
            "example": "Hello world"
        },
        "style": {
            "title": "Style",
            "type": "object",
            "properties": {
                "color": {
                    "title": "HEX Color",
                    "type": "string",
                    "example": "#FF0000"
                }
            },
            "required": [
                "color"
            ]
        }
    },
    "required": [
        "text"
    ]
}
```

Because the style is optional, you can toggle to add it. The schema form generator will see that color is a required piece of data and use the example given to fill in.

### oneOf & anyOf
The oneOf and anyOf keywords can be used inside a property and at the root level of a schema. This will create a select dropdown so that the user can switch between them. If data has been provided, it will select the first oneOf/anyOf instance it can validate against. The contents of a 'description' property will be used for the contents of the dropdown.

Example: 
```
{
    "$schema": "http://json-schema.org/schema#",
    "id": "my-component",
    "title": "My component",
    "oneOf": [
        {
            "description": "color",
            "type": "object",
            "properties": {
                "color": {
                    "title": "HEX Color",
                    "type": "string",
                    "example": "#FF0000"
                }
            }
        },
        {
            "description": "text",
            "type": "object",
            "properties": {
                "text": {
                    "title": "Text",
                    "type": "string",
                    "example": "Hello world"
                }
            }
        }
    ]
}
```

### enums
Any enums will be converted to a select dropdown.

```
{
    "$schema": "http://json-schema.org/schema#",
    "id": "my-component",
    "title": "My component",
    "type": "object",
    "properties": {
        "color": {
            "title": "Color",
            "type": "string",
            "enum" : [
                "red",
                "green",
                "blue",
                "yellow"
            ],
            "default": "red"
        }
    }
}
```

### type object
The object type will create its own section which can be navigated to via a link that is created on its parent object. Once it has been navigated to, breadcrumbs will appear above allowing the user to navigate back to the parent object.

### Keywords that cannot be interpreted

#### allOf & $ref
The `allOf` and `$ref` keywords cannot be interpreted by the schema form generator. To allow for most of the functionality there is a tool inside the `@microsoft/fast-permutator` which will simplify the schema and merge allOf arrays when it finds them, see `simplifySchemas`.
