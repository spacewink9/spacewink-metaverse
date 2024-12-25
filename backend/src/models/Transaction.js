const mongoose = require('mongoose');

// Transaction Schema
const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
    },
    transactionHash: {
        type: String,
        required: [true, 'Transaction hash is required'],
        unique: true,
    },
    amount: {
        type: Number,
        required: [true, 'Transaction amount is required'],
        min: [0, 'Amount must be a positive number'],
    },
    currency: {
        type: String,
        enum: ['ETH', 'BTC', 'ATHS'], // Example supported currencies
        required: [true, 'Currency is required'],
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
    metadata: {
        type: Object,
        default: {},
    },
}, { timestamps: true });

// Index for querying transactions by user and status
transactionSchema.index({ userId: 1, status: 1 });

// Middleware: Log transaction creation
transactionSchema.post('save', function (doc, next) {
    console.log(`Transaction ${doc.transactionHash} has been created.`);
    next();
});

// Static method: Find completed transactions for a user
transactionSchema.statics.findCompletedByUser = function (userId) {
    return this.find({ userId, status: 'completed' });
};

// Instance method: Update status
transactionSchema.methods.updateStatus = async function (newStatus) {
    this.status = newStatus;
    await this.save();
    return this;
};

// Utility method: Validate transaction hash format
transactionSchema.statics.isValidHash = function (hash) {
    const hashRegex = /^[A-Fa-f0-9]{64}$/; // Example hash validation
    return hashRegex.test(hash);
};

// Virtual field: Transaction summary
transactionSchema.virtual('summary').get(function () {
    return `Transaction ${this.transactionHash} of ${this.amount} ${this.currency}`;
});

module.exports = mongoose.model('Transaction', transactionSchema);
