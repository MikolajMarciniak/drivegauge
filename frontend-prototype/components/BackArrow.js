import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const BackArrow = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <label
      className="btn btn-ghost drawer-button"
      onClick={() => {
        handleBack();
      }}
    >
      <FontAwesomeIcon icon={faArrowLeft} size="xl" />
    </label>
  );
};

export default BackArrow;
