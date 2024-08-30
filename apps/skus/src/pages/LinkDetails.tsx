import {
  Button,
  EmptyState,
  Icon,
  PageLayout,
  SkeletonTemplate,
  goBack,
  useTokenProvider
} from '@commercelayer/app-elements'
import { Link, useLocation } from 'wouter'

import { appRoutes, type PageProps } from '#data/routes'
import { LinkDetailsCard } from 'dashboard-apps-common/src/components/LinkDetailsCard'
import { useLinkDetails } from 'dashboard-apps-common/src/hooks/useLinkDetails'

export const LinkDetails = (
  props: PageProps<typeof appRoutes.linksDetails>
): JSX.Element => {
  const {
    settings: { mode }
  } = useTokenProvider()

  const [, setLocation] = useLocation()
  const skuId = props.params?.skuId ?? ''
  const linkId = props.params?.linkId ?? ''
  const goBackUrl = appRoutes.linksList.makePath({ skuId })
  const { link, isLoading, error } = useLinkDetails(linkId)

  const pageTitle = link?.name ?? 'Link'

  return (
    <PageLayout
      mode={mode}
      title={
        <SkeletonTemplate isLoading={isLoading}>{pageTitle}</SkeletonTemplate>
      }
      navigationButton={{
        onClick: () => {
          goBack({
            setLocation,
            defaultRelativePath: goBackUrl
          })
        },
        label: 'Back',
        icon: 'arrowLeft'
      }}
      isLoading={isLoading}
      scrollToTop
      overlay
    >
      {error != null ? (
        <EmptyState
          title='Not authorized'
          action={
            <Link href={goBackUrl}>
              <Button variant='primary'>Go back</Button>
            </Link>
          }
        />
      ) : (
        <SkeletonTemplate isLoading={isLoading}>
          <LinkDetailsCard
            link={link}
            primaryAction={
              <Button
                variant='secondary'
                size='small'
                alignItems='center'
                onClick={() => {
                  goBack({
                    setLocation,
                    defaultRelativePath: goBackUrl
                  })
                }}
              >
                <Icon name='archive' size={16} />
                View archive
              </Button>
            }
            showQR
          />
        </SkeletonTemplate>
      )}
    </PageLayout>
  )
}
