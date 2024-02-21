import React from "react";

interface FormInput {
    type: string;
    placeholder: string;
    name: string;
}

interface FormInputsProps {
    formInputs: FormInput[];
}

const FormInputs: React.FC<FormInputsProps> = ({ formInputs }) => {
    return (
        <>
            {formInputs.map((value, index) => (
                <div key={index} className="col-xl-6">
                    <div className="contact-page-form-input-box mb-4">
                        <input
                            className="w-100 h-100 p-3 fs-6"
                            type={value.type}
                            placeholder={value.placeholder}
                            name={value.name}
                        />
                    </div>
                </div>
            ))}
        </>
    );
};

export default FormInputs;
