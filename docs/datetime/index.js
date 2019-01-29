module.exports = () => {
    return [
        '',
        'overview/design.md',
        'overview/packages.md',
        'overview/naming.md',
        {
            title: "标准日历",
            collapsable: true,
            children: [
                ['iso/','Standard Calendar'],
                'iso/overview.md',
                'iso/enum.md',
                'iso/date.md',
                'iso/datetime.md',
                'iso/timezones.md',
                'iso/instant.md',
                'iso/format.md',
                'iso/Temporal.md',
                'iso/adjusters.md',
                'iso/queries.md',
                'iso/period.md',
                'iso/clock.md',
                'iso/nonIso.md',
                'iso/legacy.md',
                'iso/summary.md',
                'iso/qande/questions.md',
            ]
        }
    ]
}
