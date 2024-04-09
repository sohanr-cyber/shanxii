import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'

const steps = [
  'Pending',
  'Processing',
  'Confirmed',
  'Packing',
  'Packed',
  'Delivering',
  'Delivered'
]

const index = order =>
  order.statusTimeline.findIndex(item => item.status === order.status)

export default function HorizontalLinearAlternativeLabelStepper ({ order }) {
  const [failed, setFailed] = React.useState(
    order.statusTimeline.find(
      i => i.status == 'Failed' || i.status == 'Canceled'
    )
      ? index(order)
      : null
  )

  React.useEffect(() => {
    setFailed(
      order.statusTimeline.find(
        i => i.status == 'Failed' || i.status == 'Canceled'
      )
        ? index(order)
        : null
    )
  }, [order])

  const isStepFailed = step => {
    return step === failed
  }
  return (
    <>
      <Box sx={{ width: '100%', overflow: 'auto' }}>
        <Stepper activeStep={index(order) + (failed ? 0 : 1)} alternativeLabel>
          {steps.map((label, index) => {
            const labelProps = {}
            if (isStepFailed(index)) {
              labelProps.optional = (
                <Typography variant='caption' color='error'>
                  {/* Alert message */}
                </Typography>
              )

              labelProps.error = true
            }
            return (
              <Step key={label}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </Box>
    </>
  )
}
