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
  clearError,
  clearTransferSuccess,
} from "../redux/slices/TransferSlices";

export const useTransfer = () => {
  const dispatch = useDispatch();
  const { transfer, accountInformation, loading, error, transferSuccess } =
    useSelector((state: any) => state.transfer);

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

  const clearErrorData = () => {
    dispatch(clearError());
  };

  const clearTransferSuccessData = () => {
    dispatch(clearTransferSuccess());
  };
  return {
    transferSuccess,
    loading,
    error,
    transfer,
    accountInformation,
    clearErrorData,
    fetchAccountInformationData,
    updateTransferDetailData,
    clearTransferDetailData,
    updateAccountInformationData,
    topUpBalanceData,
    transferAmountData,
    clearTransferSuccessData,
  };
};
