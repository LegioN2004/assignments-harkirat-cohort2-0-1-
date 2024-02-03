import axios from 'axios';
import { atomFamily, selectorFamily } from 'recoil';

export const countAtom = atomFamily({
	key: 'countAtom',
	default: selectorFamily({
		key: 'countSelector',
		get:
			(count) =>
			async ({ get }) => {
				const res = await axios.get(
					`https://random-word-api.vercel.app/api?words=${count}`
				);
				return res.join(' ');
			},
	}),
});
