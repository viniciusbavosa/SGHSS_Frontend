import { useState } from "react";
import { StepIndicator } from "./step-indicator";
import { ConfirmationStep } from "../form/confirmation-step";
import { DateTimeStep } from "../form/date-time-step";
import { DoctorStep } from "../form/doctor-step";
import { SpecialtyStep } from "../form/specialty-step";
import { PersonalInfoStep } from "../form/personal-info";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface BookingData {
  specialty: string;
  doctor: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

export const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    specialty: "",
    doctor: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    cpf: "",
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDataUpdate = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const handleClose = () => {
    setCurrentStep(1);
    setBookingData({
      specialty: "",
      doctor: "",
      date: "",
      time: "",
      name: "",
      email: "",
      phone: "",
      cpf: "",
    });
    onClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SpecialtyStep
            data={bookingData}
            onUpdate={handleDataUpdate}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <DoctorStep
            data={bookingData}
            onUpdate={handleDataUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <DateTimeStep
            data={bookingData}
            onUpdate={handleDataUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <PersonalInfoStep
            data={bookingData}
            onUpdate={handleDataUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 5:
        return (
          <ConfirmationStep
            data={bookingData}
            onPrevious={handlePrevious}
            onClose={handleClose}
          />
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          ✕
        </button>
        <div className="modal-header">
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        </div>
        <div className="modal-body">{renderStep()}</div>
      </div>
    </div>
  );
};
