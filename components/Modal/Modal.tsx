import useTranslation from "next-translate/useTranslation";

type ModalProps = {};

const Modal: React.FC<ModalProps> = ({
  open,
  title,
  onCancel,
  size = "medium",
  onSubmit,
  children,
}) => {
  const { t } = useTranslation("common");

  return (
    <div
      className={`modal relative z-100 ${open ? "d-block" : "hidden"}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div
            className={`${size === "lg" && "w-2/3"} ${
              size === "md" && "sm:max-w-lg"
            } relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8  `}
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex-col sm:flex sm:items-start">
                <div className="title w-full mt-0 text-center  sm:ml-4 sm:text-left border-b-gray-100">
                  <h3
                    className="text-lg leading-6 font-medium rtl:text-right ltr:text-left mt-0"
                    id="modal-title"
                  >
                    {title}
                  </h3>
                </div>
                <div className="mt-2 w-full">{children}</div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-center">
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={onCancel}
              >
                {t("cancel")}
              </button>
              <button
                type="button"
                className="primary inline-flex justify-center mx-3"
                onClick={onSubmit}
              >
                {t("save")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
