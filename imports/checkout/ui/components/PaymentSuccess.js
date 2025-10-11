"use client";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const PaymentSuccess = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const router = useRouter();

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backdropFilter: "blur(6px)",
        backgroundColor: "rgba(0,0,0,0.4)",
      }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="success-popup-overlay ">
        <div className="success-popup text-center p-4">
          <div className="modal-body">
            <CheckCircle
              className="text-success mb-3  animate-check"
              size={60}
            />
            <h5 className="modal-title mb-2">Payment Successful 🎉</h5>
            <p className="text-muted ">
              Thank you for your purchase! Your order has been placed
              successfully.
            </p>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button
              className=" bt-btn "
              onClick={() => {
                router.push("/");
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
