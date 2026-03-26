import { create } from 'zustand';

const useUserStore = create((set) => ({
  // 1. Data Awal Pengguna
  balance: 15.50, // Saldo awal simulasi (ETH)
  collectedNFTs: [], // Array kosong untuk NFT yang dibeli
  activities: [], // Riwayat aktivitas

  // 2. Fungsi Pembelian (Logika Transaksi)
  buyNFT: (nftData) => set((state) => {
    // Cek apakah NFT sudah pernah dibeli (berdasarkan judul sebagai ID sementara)
    const isAlreadyOwned = state.collectedNFTs.find(item => item.title === nftData.title);
    if (isAlreadyOwned) return state; // Jika sudah punya, batalkan proses

    const gasFee = 0.015;
    const totalCost = nftData.price + gasFee;

    // Pastikan saldo cukup
    if (state.balance < totalCost) {
      console.error("Insufficient Balance");
      return state; 
    }

    // Buat riwayat aktivitas baru
    const newActivity = {
      id: Date.now(), // ID unik berdasarkan waktu
      type: 'Bought',
      nftTitle: nftData.title,
      nftImage: nftData.image,
      price: nftData.price,
      from: nftData.author,
      time: 'Just now'
    };

    // Update Global State: Kurangi saldo, tambah NFT, tambah aktivitas
    return {
      balance: state.balance - totalCost,
      collectedNFTs: [{ ...nftData, isOwned: true, id: Date.now() }, ...state.collectedNFTs],
      activities: [newActivity, ...state.activities]
    };
  })
}));

export default useUserStore;