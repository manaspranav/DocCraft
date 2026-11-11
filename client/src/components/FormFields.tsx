"use client";
import React from "react";
import {
  Type,
  Hash,
  Calendar as CalendarIcon,
  CheckSquare,
  Circle,
  List,
  AlignJustify,
  Paperclip,
  Trash2,
  Download,
} from "lucide-react";

interface Field {
  id?: string;
  type: string;
  question: string;
  options: string[];
  selectedOption?: string | string[];
  sizeLimit?: string;
  sizeUnit?: string;
}

export type { Field };

interface FieldType {
  icon: React.ComponentType<{ size: number; className?: string }>;
  label: string;
  type: string;
}

const FormFields: React.FC<{ fields: Field[]; setFields: (fields: Field[]) => void }> = ({ fields, setFields }) => {
  const [focusedField, setFocusedField] = React.useState<number | null>(null);

  const fieldTypes: FieldType[] = [
    { icon: Type, label: "Text", type: "text" },
    { icon: Hash, label: "Number", type: "number" },
    { icon: CalendarIcon, label: "Date", type: "date" },
    { icon: CheckSquare, label: "Checkbox", type: "checkbox" },
    { icon: Circle, label: "Radio", type: "radio" },
    { icon: List, label: "Dropdown", type: "dropdown" },
    { icon: AlignJustify, label: "Textarea", type: "textarea" },
    { icon: Paperclip, label: "File", type: "file" },
  ];

  const getLabelForType = (type: string) => {
    const found = fieldTypes.find((ft) => ft.type === type);
    return found ? found.label : "";
  };

  const handleAddField = (type: string) => {
    const label = getLabelForType(type);
    const isOptionType = ["checkbox", "radio", "dropdown"].includes(type);
    const newField: Field = {
      type,
      question: label,
      options: isOptionType ? ["Option"] : [],
      selectedOption: "",
      sizeLimit: "",
      sizeUnit: "MB",
    };
    setFields([...fields, newField]);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index].question = value;
    setFields(newFields);
  };

  const handleFileSizeLimitChange = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index].sizeLimit = value;
    setFields(newFields);
  };

  const handleFileSizeUnitChange = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index].sizeUnit = value;
    setFields(newFields);
  };

  const handleOptionChange = (fieldIndex: number, optionIndex: number, value: string) => {
    const newFields = [...fields];
    newFields[fieldIndex].options[optionIndex] = value;
    setFields(newFields);
  };

  const addOption = (fieldIndex: number) => {
    const newFields = [...fields];
    newFields[fieldIndex].options.push("Option");
    setFields(newFields);
  };

  const removeOption = (fieldIndex: number, optionIndex: number) => {
    const newFields = [...fields];
    newFields[fieldIndex].options.splice(optionIndex, 1);
    setFields(newFields);
  };

  const removeField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleSelectedOptionChange = (fieldIndex: number, value: string) => {
    const newFields = [...fields];
    newFields[fieldIndex].selectedOption = value;
    setFields(newFields);
  };

  // Map UI field types to backend QuestionType
  const mapTypeToBackend = (type: string) => {
    switch (type) {
      case "number": return "int";
      case "text": return "string";
      case "textarea": return "string";
      case "checkbox": return "boolean";
      case "radio": return "string";
      case "dropdown": return "string";
      case "date": return "string";
      default: return "string";
    }
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg mb-6 flex font-roboto">
      <div className="w-1/4 pr-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 font-roboto">FORM FIELDS</h3>
        <div className="mb-4">
          {/* Removed form title input */}
        </div>
        <div className="space-y-3">
          {fieldTypes.map((fieldType) => (
            <button
              key={fieldType.type}
              className="
                w-full flex items-center justify-center
                px-6 py-2
                rounded-full
                font-roboto
                bg-gray-100
                transition duration-200
                hover:bg-gradient-to-r hover:from-indigo-200 hover:to-purple-200 hover:text-gray-800 hover:shadow-lg
                active:bg-gradient-to-r active:from-indigo-400 active:to-purple-400 active:text-white active:shadow-lg
                focus:outline-none
              "
              onClick={() => handleAddField(fieldType.type)}
              type="button"
              style={{
                boxShadow: "0 2px 8px 0 rgba(80,80,160,0.04)",
              }}
            >
              <fieldType.icon size={18} className="mr-2" />
              {fieldType.label}
            </button>
          ))}
        </div>
      </div>
      <div className="w-3/4 pl-4">
        <div className="border-2 border-gray-300 p-4 rounded-lg mb-4 min-h-[200px]">
          <h3 className="text-lg font-semibold text-gray-700 mb-2 font-roboto">Create Page</h3>
          {fields.map((field, index) => {
            const isOptionType = ["checkbox", "radio", "dropdown"].includes(field.type);
            return (
              <div key={index} className="mb-4 p-2 border rounded flex items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    className={`w-full p-2 border rounded mb-2 focus:ring-2 focus:ring-indigo-200 hover:bg-gray-50 hover:shadow-md transition duration-200 font-roboto ${
                      focusedField === index ? "bg-gradient-to-r from-indigo-100 to-purple-100" : ""
                    }`}
                    value={field.question}
                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                    onFocus={() => setFocusedField(index)}
                    onBlur={() => setFocusedField(null)}
                  />

                  {field.type === "file" && (
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-10 h-10 flex items-center justify-center border rounded bg-gray-100">
                        <Download size={28} className="text-gray-600" />
                      </div>
                      <input
                        type="number"
                        min={1}
                        className="w-32 p-2 border rounded text-sm focus:ring-2 focus:ring-indigo-200 hover:bg-gray-50 hover:shadow-md transition duration-200 font-roboto"
                        placeholder="Size"
                        value={field.sizeLimit || ""}
                        onChange={(e) => handleFileSizeLimitChange(index, e.target.value)}
                      />
                      <select
                        className="w-28 p-2 border rounded text-sm focus:ring-2 focus:ring-indigo-200 hover:bg-gray-50 hover:shadow-md transition duration-200 font-roboto"
                        value={field.sizeUnit || "MB"}
                        onChange={(e) => handleFileSizeUnitChange(index, e.target.value)}
                      >
                        <option value="KB">KB</option>
                        <option value="MB">MB</option>
                      </select>
                      <span className="text-xs text-gray-500 font-roboto">File size limit</span>
                    </div>
                  )}

                  {["text", "number", "textarea"].includes(field.type) && (
                    <div
                      className={`w-full p-2 border rounded mb-2 bg-gray-100 text-gray-500 font-roboto ${
                        field.type === "textarea" ? "h-[200px]" : ""
                      }`}
                    >
                      Answer
                    </div>
                  )}

                  {field.type === "date" && (
                    <input
                      type="date"
                      className="w-full p-2 border rounded mb-2 focus:ring-2 focus:ring-indigo-200 hover:bg-gray-50 hover:shadow-md transition duration-200 font-roboto"
                    />
                  )}

                  {isOptionType && (
                    <div>
                      {/* Option text inputs for editing */}
                      {field.options && field.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center mb-2">
                          {/* Interactive preview for checkbox, radio, dropdown */}
                          {field.type === "checkbox" && (
                            <input
                              type="checkbox"
                              className="mr-2"
                              checked={Array.isArray(field.selectedOption) ? field.selectedOption.includes(option) : false}
                              onChange={e => {
                                const newFields = [...fields];
                                let selected = Array.isArray(field.selectedOption) ? [...field.selectedOption] : [];
                                if (e.target.checked) {
                                  selected.push(option);
                                } else {
                                  selected = selected.filter(o => o !== option);
                                }
                                newFields[index].selectedOption = selected;
                                setFields(newFields);
                              }}
                            />
                          )}
                          {field.type === "radio" && (
                            <input
                              type="radio"
                              className="mr-2"
                              name={`group-${index}`}
                              checked={field.selectedOption === option}
                              onChange={() => {
                                const newFields = [...fields];
                                newFields[index].selectedOption = option;
                                setFields(newFields);
                              }}
                            />
                          )}
                          <input
                            type="text"
                            className="w-full p-2 border rounded mr-2 focus:ring-2 focus:ring-indigo-200 hover:bg-gray-50 hover:shadow-md transition duration-200 font-roboto"
                            value={option}
                            onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                          />
                          <Trash2
                            size={16}
                            className="text-red-500 cursor-pointer"
                            onClick={() => removeOption(index, optIndex)}
                          />
                        </div>
                      ))}
                      <button
                        className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 hover:shadow-md hover:-translate-y-0.5 transition duration-200 font-roboto"
                        onClick={() => addOption(index)}
                        type="button"
                      >
                        Add Option
                      </button>
                      {/* Interactive preview for dropdown */}
                      {field.type === "dropdown" && field.options && (
                        <div className="mt-2">
                          <select
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-200 hover:bg-gray-50 hover:shadow-md transition duration-200 font-roboto"
                            value={field.selectedOption || ""}
                            onChange={e => {
                              const newFields = [...fields];
                              newFields[index].selectedOption = e.target.value;
                              setFields(newFields);
                            }}
                          >
                            <option value="" disabled>
                              Select an option
                            </option>
                            {field.options.map((option, optIndex) => (
                              <option key={optIndex} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <button
                  className="ml-2 p-1 text-red-500 hover:text-red-700"
                  onClick={() => removeField(index)}
                  type="button"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FormFields;