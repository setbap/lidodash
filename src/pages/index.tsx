import Home from "lib/pages/home";
import { getStakersAndStakedInfo } from "lib/requests/home";
export async function getStaticProps() {
    const [
        stakersAndStakedInfo
    ] = await Promise.all([
        getStakersAndStakedInfo()

    ]);
    return {
        props: {
            stakersAndStakedInfo
        },
        revalidate: 10 * 60,
    };
}
export default Home;
