import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import Layout from "@/components/layout";
import { getComponents } from "@/lib/builtjs-utils";
import { setupCrumbs } from "@/lib/theme/crumbs";
// const { transformPage, fetchEntry, fetchEntries } = require("@builtjs/theme");
import { transformPage, fetchEntry, fetchEntries } from '../../theme/index';

const Page = ({ config }: any) => {
  const router = useRouter();
  const params = useParams();
  const [page, setPage] = useState<any>(null);
  const [sectionComps, setSectionComps] = useState<React.ComponentType[]>([]);
  const [layoutComps, setLayoutComps] = useState<React.ComponentType[]>([]);
  const hasSetUpCrumbs = useRef(false);

  useEffect(() => {
    if (!hasSetUpCrumbs.current) {
      setupCrumbs(router);
      hasSetUpCrumbs.current = true;
      setPage(null);
      setLayoutComps([]);
      init();
    }

    // SSE Listener for data.json file to trigger page reload when data.json is updated
    const eventSource = new EventSource("/api/data");
    eventSource.onmessage = () => {
      init();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  async function init() {
    if (!config) {
      return;
    }
    let page: any = await transformPage(config, params);
    if (!page) {
      return;
    }
    let [sectionComponents, layoutComponents] = await Promise.all([
      getComponents(page.sections),
      getComponents(page.layout.sections),
    ]);
    setPage(page);
    setSectionComps(sectionComponents as React.ComponentType[]);
    setLayoutComps(layoutComponents as React.ComponentType[]);
  }

  return (
    <>
      <Layout layoutComps={layoutComps} page={page}>
        {
          <>
            {page &&
              sectionComps.length > 0 &&
              sectionComps.map((Section: any, i: number) => {
                return (
                  page.sections[i] && (
                    <Section
                      key={i}
                      content={page.sections[i].content}
                      api={{ fetchEntry, fetchEntries }}
                    />
                  )
                );
              })}
          </>
        }
      </Layout>
      {!config && (
        <div>No data found. Did you run `npx create-built-app update`?</div>
      )}
    </>
  );
};

export default Page;
