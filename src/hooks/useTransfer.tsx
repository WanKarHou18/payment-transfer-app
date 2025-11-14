// third party
import { useDispatch, useSelector } from "react-redux";

// this project
import { fetchAccountInformation } from "../redux/slices/TransferSlices";

export const useTransfer = () => {
  const dispatch = useDispatch();
  const { transfer, accountInformation } = useSelector(
    (state: any) => state.transfer
  );

  const fetchAccountInformationData = () => {
    dispatch(fetchAccountInformation());
  };

  return {
    transfer,
    accountInformation,
    fetchAccountInformationData,
  };
};
