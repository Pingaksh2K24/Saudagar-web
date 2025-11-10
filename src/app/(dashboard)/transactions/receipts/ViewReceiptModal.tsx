'use client';

import { useState, useEffect } from 'react';
import { Close, Print } from '@mui/icons-material';
import moment from 'moment';
import DashboardServices from '@/lib/api/axiosServices/apiServices/DashboardServices';
import { showError } from '@/utils/notification';
import { generateReceiptTemplate } from '@/reports/receipt-template';

interface ReceiptData {
  id: number;
  agent_name: string;
  total_bids: number;
  total_amount: number;
  receipt_date: string;
  receipt_number: string;
  status: string;
  [key: string]: unknown;
}

interface BidDetail {
  bid_type_name: string;
  bid_number: string;
  amount: number;
}

interface ReceiptDetailsResponse {
  bid_details?: BidDetail[];
  bids?: BidDetail[];
}

interface ViewReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  receipt: ReceiptData | null;
}

export default function ViewReceiptModal({
  isOpen,
  onClose,
  receipt,
}: ViewReceiptModalProps) {
  const [receiptDetails, setReceiptDetails] =
    useState<ReceiptDetailsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const dashboardServices = new DashboardServices();

  useEffect(() => {
    if (isOpen && receipt) {
      fetchReceiptDetails();
    }
  }, [isOpen, receipt?.id]);

  const fetchReceiptDetails = async () => {
    if (!receipt) return;
    setLoading(true);
    dashboardServices
      .getReceiptDetails(receipt.id)
      .then((response: unknown) => {
        console.log('Receipt details response:', response);
        const apiResponse = response as {
          statusCode?: number;
          success?: boolean;
          data?: ReceiptDetailsResponse;
          message?: string;
        };
        if (apiResponse?.statusCode === 200 && apiResponse?.success === true) {
          setReceiptDetails(apiResponse?.data || null);
        } else {
          showError(apiResponse?.message || 'Failed to fetch receipt details');
        }
        setLoading(false);
      });
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const htmlContent = generateReceiptTemplate(receipt, bidDetails);
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }
  };

  if (!isOpen || !receipt) return null;

  const bidDetails: BidDetail[] =
    receiptDetails?.bid_details || receiptDetails?.bids || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header with Logo and Close */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center mr-3">
              <img
                src="/images/icon.png"
                alt="Saudagar"
                className="w-16 h-16"
              />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Receipt</h2>
              <p className="text-sm text-red-500 font-medium">Nivana Morning</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <Close className="w-5 h-5" />
          </button>
        </div>

        {/* Receipt Content */}
        <div className="p-4" id="receipt-content">
          {/* Receipt Number and Date */}
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600">#{receipt.receipt_no}</p>
            <p className="text-xs text-gray-500">
              {moment(receipt.receipt_date).format('DD/MM/YYYY')}
            </p>
          </div>

          {/* Agent Info */}
          <div className="mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Agent Name</span>
              <span className="font-medium">{receipt.agent_name}</span>
            </div>
          </div>

          {/* Bid Status */}
          <div className="text-center mb-4">
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              Bid for Open
            </span>
          </div>

          {/* Bid Details Table */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Bid Details</h3>
            <table className="bid-table w-full border-collapse border">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-2 text-xs font-medium text-gray-600">
                    No.
                  </th>
                  <th className="border p-2 text-xs font-medium text-gray-600">
                    Type
                  </th>
                  <th className="border p-2 text-xs font-medium text-gray-600">
                    Number
                  </th>
                  <th className="border p-2 text-xs font-medium text-gray-600">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="border p-4 text-center text-sm text-gray-500"
                    >
                      Loading bid details...
                    </td>
                  </tr>
                ) : bidDetails.length > 0 ? (
                  bidDetails.map((bid, index) => (
                    <tr key={index}>
                      <td className="border p-2 text-xs">#{index + 1}</td>
                      <td className="border p-2 text-xs">
                        {bid.bid_type_name || 'Single Digit'}
                      </td>
                      <td className="border p-2 text-xs font-medium">
                        {bid.bid_number}
                      </td>
                      <td className="border p-2 text-xs text-green-600 font-medium">
                        ₹{bid.amount}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="border p-4 text-center text-sm text-gray-500"
                    >
                      No bid details found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Total Amount */}
          <div className="border-t pt-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Bid Amount:</span>
              <span className="text-lg font-bold text-green-600">
                ₹{bidDetails.reduce((sum, bid) => sum + Number(bid.amount), 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 p-4 border-t">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center"
          >
            <Print className="w-4 h-4 mr-2" />
            Print
          </button>
        </div>
      </div>
    </div>
  );
}
