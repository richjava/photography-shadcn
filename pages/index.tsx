import { GetStaticProps } from "next";
  import { withRouter } from "next/router";
  import { getConfig } from "../theme/index";
  // import { getConfig } from "@builtjs/theme";
  import Page from "@/lib/theme/page";
  
  export default withRouter(Page);
  
  export const getStaticProps: GetStaticProps = async ({params}) => {
    const config = await getConfig({pageName: 'home'});
    config.params = params || null;
    return {
      props: { config }
    };
  };