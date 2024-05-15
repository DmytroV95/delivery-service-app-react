import * as authorities from 'constants/authorities';
import PageAccessValidator from "./components/PageAccessValidator";
import PageContainer from "./components/PageContainer";
import CargosListPage  from 'pages/cargosList';

const CargosList = () => {
  return (
    <PageAccessValidator
      neededAuthorities={[authorities.ENABLE_SEE_CARGOS_LIST_PAGE]}
    >
      <PageContainer>
        <CargosListPage />
      </PageContainer>
     </PageAccessValidator>
  );
};

export default CargosList;
