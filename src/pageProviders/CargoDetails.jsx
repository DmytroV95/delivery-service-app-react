import * as authorities from "constants/authorities";
import PageAccessValidator from "./components/PageAccessValidator";
import PageContainer from "./components/PageContainer";
import CargoDetailsPage from "pages/cargoDetails";

const CargoDetails = () => {
  return (
    <PageAccessValidator
      neededAuthorities={[authorities.ENABLE_SEE_CARGO_DETAILS_PAGE]}
    >
      <PageContainer>
        <CargoDetailsPage />
      </PageContainer>
    </PageAccessValidator>
  );
};

export default CargoDetails;
