import React from 'react';
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from '@/components/ui/select';

const CommonForm = ({ onSubmit, formControls, formData, setFormData, buttonText }) => {
  const renderFormControl = (controlItem) => {
    switch (controlItem.componentType) {
      case 'input':
        return (
          <div key={controlItem.name} className="mb-4">
            <label htmlFor={controlItem.name} className="block font-medium">
              {controlItem.label}
            </label>
            <input
              type={controlItem.type}
              id={controlItem.name}
              name={controlItem.name}
              placeholder={controlItem.placeholder}
              value={formData[controlItem.name] || ''}
              onChange={(e) =>
                setFormData({ ...formData, [controlItem.name]: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
        );
      case 'textarea':
        return (
          <div key={controlItem.name} className="mb-4">
            <label htmlFor={controlItem.name} className="block font-medium">
              {controlItem.label}
            </label>
            <textarea
              id={controlItem.name}
              name={controlItem.name}
              placeholder={controlItem.placeholder}
              value={formData[controlItem.name] || ''}
              onChange={(e) =>
                setFormData({ ...formData, [controlItem.name]: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
        );
      case 'select':
        return (
          <div key={controlItem.name} className="mb-4">
            <label htmlFor={controlItem.name} className="block font-medium">
              {controlItem.label}
            </label>
            <Select
              value={formData[controlItem.name] || ''}
              onValueChange={(value) =>
                setFormData({ ...formData, [controlItem.name]: value })
              }
            >
              <SelectTrigger
                className="w-full p-2 border rounded bg-white shadow-sm cursor-pointer"
                style={{
                  backgroundColor: 'white',
                  borderColor: '#ddd',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                <SelectValue placeholder={controlItem.label} />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                {controlItem.options?.map((option) => (
                  <SelectItem
                    key={option.id}
                    value={option.id}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    style={{
                      backgroundColor: 'white',
                      padding: '0.5rem',
                      borderBottom: '1px solid #eee',
                      cursor: 'pointer',
                    }}
                  >
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {formControls.map((controlItem) => renderFormControl(controlItem))}
      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
        {buttonText}
      </button>
    </form>
  );
};

export default CommonForm;
