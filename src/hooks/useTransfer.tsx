// third party
import { useDispatch, useSelector } from "react-redux";

// this project
import {
  clearTransferDetail,
  fetchAccountInformationThunk,
  topUpBalanceThunk,
  transferAmountThunk,
  updateAccountInformation,
  updateTransferDetail,
} from "../redux/slices/TransferSlices";

export const useTransfer = () => {
  const dispatch = useDispatch();
  const { transfer, accountInformation } = useSelector(
    (state: any) => state.transfer
  );

  const fetchAccountInformationData = () => {
    dispatch(fetchAccountInformationThunk());
  };

  const updateTransferDetailData = (payload: {}) => {
    dispatch(updateTransferDetail(payload));
  };

  const clearTransferDetailData = () => {
    dispatch(clearTransferDetail());
  };

  const updateAccountInformationData = (payload: {}) => {
    dispatch(updateAccountInformation(payload));
  };

  const transferAmountData = (payload: {}) => {
    dispatch(transferAmountThunk(payload));
  };

  const topUpBalanceData = (payload: {}) => {
    dispatch(topUpBalanceThunk(payload));
  };
  return {
    transfer,
    accountInformation,
    fetchAccountInformationData,
    updateTransferDetailData,
    clearTransferDetailData,
    updateAccountInformationData,
    topUpBalanceData,
    transferAmountData,
  };
};
