import LocationFilter from "./partials/LocationFilter";
import ModalHeader from "./partials/ModalHeader";
import TourModal from "./partials/TourModal";

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ setIsModalOpen }: Props) => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 mt-12">
      {/* Header */}
      <div className="w-[600px] overflow-y-auto h-[800px] bg-white shadow-xl p-4 rounded-xl">
        <ModalHeader setIsModalOpen={setIsModalOpen} />
        <LocationFilter/>
        <TourModal />
      </div>
    </div>
  );
};

export default Modal;
