import User   from '../../../../../../../lib/domain-model/User.mjs';

export default async function checkSideEffects({ userId }) {
    const user = await User.findById(userId);

    if (user.status !== 'ACTIVE') throw new Error(`User with email = ${user.email} should be ACTIVE`);
}
