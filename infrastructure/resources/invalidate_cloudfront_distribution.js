/* eslint-disable no-await-in-loop */
const aws = require('aws-sdk');

exports.handler = async (event) => {
  const cloudfront = new aws.CloudFront();

  const distributionId = process.env.CLOUDFRONT_DISTRIBUTION_ID;

  if (!distributionId) throw new Error('Missing CLOUDFRONT_DISTRIBUTION_ID Environment Variable');

  const createInvalidationRequest = {
    DistributionId: distributionId,
    InvalidationBatch: { Paths: { Quantity: 1, Items: ['/*'] }, CallerReference: Date.now().toString() },
  };

  const createInvalidationResult = await cloudfront.createInvalidation(createInvalidationRequest).promise();

  const invalidationId = createInvalidationResult.Invalidation?.Id;

  if (!invalidationId) throw new Error('CloudFront API did not return an invalidation ID.');

  const getInvalidationRequest = {
    DistributionId: distributionId,
    Id: invalidationId,
  };

  let status = 'Initializing';
  do {
    const getInvalidationResult = await cloudfront.getInvalidation(getInvalidationRequest).promise();
    status = getInvalidationResult.Invalidation?.Status || 'Initializing';
  } while (['Initializing', 'InProgress'].includes(status));

  if (status !== 'Completed') throw new Error('Invalidation Failed');

  console.log('Final Status -> ', status);
};
