import Home from "lib/pages/home";
import { getStakersAndStakedInfo, getTotalETHAndStakedInfo } from "lib/requests/home";
export async function getStaticProps() {
    const [
        stakersAndStakedInfo,
        totalETHAndStakedInfo
    ] = await Promise.all([
        getStakersAndStakedInfo(),


        getTotalETHAndStakedInfo(),

    ]);
    return {
        props: {
            stakersAndStakedInfo,
            totalETHAndStakedInfo
        },
        revalidate: 10 * 60,
    };
}
export default Home;
