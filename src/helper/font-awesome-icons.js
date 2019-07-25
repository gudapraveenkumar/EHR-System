import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
      faTasks,
      faKey,
      faBorderAll,
      faAlignJustify,
      faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import {
      faFile as faFileRegular,
      faCheckSquare as faCheckSquareRegular,
      faUserCircle as faUserCircleRegular,
      faCalendar as faCalendarRegular } from '@fortawesome/free-regular-svg-icons'

// Creating library for the icons we use, by this bundle is created only with icons we used instead of all fontawesome icons
library.add(
   fab,
   faFileRegular,
   faCheckSquareRegular,
   faUserCircleRegular,
   faCalendarRegular,
   faTasks,
   faBorderAll,
   faKey,
   faAlignJustify,
   faSignOutAlt
   )

