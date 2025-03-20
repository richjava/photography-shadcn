import { GetStaticProps } from "next";
  import { withRouter } from "next/router";
  // import { getConfig } from "@builtjs/theme";
  import { getConfig } from "../theme/index";
  import Page from "@/lib/theme/page";
  
  export default withRouter(Page);
  
  export const getStaticProps: GetStaticProps = async ({params}) => {
    const config = await getConfig({pageName: 'projects'});
    config.params = params || null;
    return {
      props: { config }
    };
  };