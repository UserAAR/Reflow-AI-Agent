Design the main Reflow application as a fully interactive, production-ready AI workflow canvas for Bravo supermarkets. This must be a real workflow execution experience, not a static SVG, not a dashboard, and not a generic app layout.

The application must contain only the workflow canvas as the core screen, with a clean top header and a small floating toolbar. There must be no left sidebar, no dashboard sections, no unnecessary navigation panels, and no clutter.

The workflow canvas must behave like a live orchestration engine similar in interaction model to n8n or make.com, but visually more premium, more minimal, and more advanced.

The user must be able to:
- drag the canvas freely
- pan in all directions
- zoom in and out smoothly
- interact with nodes
- follow the execution state visually
- open contextual overlays when a step requires additional data

The workflow must wrap across the screen in a smart, readable structure. Do not place all nodes in one long horizontal line. When the available width ends, the flow should continue downward and restart from the left side, so the entire workflow remains readable and premium. The canvas should feel like a modular orchestration map, not a cramped flowchart.

TOP HEADER

Keep only a thin premium top header containing:
- Reflow logo
- workflow name
- live status
- Start button
- Pause button
- Reset button
- Export button
- theme switcher
- user avatar
- save state indicator

The Start button must be prominent and clean. When clicked, the workflow begins executing step by step.

FLOATING TOOLBAR

Add a floating movable toolbar that can be dragged anywhere on the canvas. It should feel lightweight and advanced. It may contain:
- zoom controls
- minimap toggle
- search
- node navigator
- logs toggle
- execution tools

This toolbar must not behave like a permanent sidebar. It should float above the canvas.

WORKFLOW EXECUTION STATES

The workflow must show state clearly at all times.

When a step is active:
- the active node or step container must show a premium green animated effect
- use a glowing outline, soft rotating ring, flowing green edge, or subtle loading current
- the animation must be minimal but clearly visible
- the active step must immediately stand out from all other nodes

When a step is completed:
- show it in a muted gray or soft desaturated done state
- include an elegant check or completion state
- do not make done nodes too bright
- completed steps should feel calm, finished, and stable

When a step is pending:
- keep it neutral and minimal

The execution flow must always make the current step obvious.

LOG PANEL

Add a small premium log panel in the bottom-right corner of the screen.

This panel must remain visible during execution and show live workflow logs such as:
- Product intake started
- Parsing upload
- Validating fields
- Running similarity search
- Forecasting demand
- Calculating price
- Checking store capacity
- Approval requested
- Execution started
- Monitoring active

The log panel should update in real time as the workflow progresses. It should feel like an operational feed, not a generic terminal.

WORKFLOW STRUCTURE

The workflow should include only the real steps of the Bravo new product onboarding process. Do not add fake or unnecessary steps.

The first node is Commercial Agreement Completed. This should already be shown as done and locked because it happens outside the system.

Next is Product Intake. This step should receive real inputs such as:
- product images
- CSV upload
- Excel upload
- manual form input
- supplier metadata
- technical documents
- barcode data
- packaging data

This step may open a contextual overlay when activated, because it requires user input.

Next is Data Validation. This should remain compact and clear, with only the needed checks:
- missing field detection
- barcode verification
- unit standardization
- category validation
- packaging verification
- document consistency

Next is Similarity Intelligence Engine. This is a critical step and may be visually richer than the others. It should contain a small set of parallel sub-nodes such as:
- category matching
- subcategory matching
- price band detection
- packaging analysis
- family analysis
- brand positioning
- description analysis
- historical pattern matching
- seasonal similarity

These sub-nodes should merge back into a central similarity core.

Next is Demand Forecasting Engine. Keep this intelligent but readable. Sub-modules may include:
- historical similarity
- regional demand
- seasonal demand
- store-type analysis
- launch volume prediction
- replenishment estimation

Next is Costing and Margin Engine. Keep it structured and numeric:
- import cost
- logistics cost
- tax impact
- warehouse cost
- margin calculation
- retail price recommendation

Next is Branch Allocation System. This step should clearly show capacity-aware logic because not every store can receive the same product. Show a limited and meaningful set of sub-nodes such as:
- store capacity analysis
- shelf space validation
- active SKU limits
- footfall analysis
- customer profile matching
- assortment optimization
- branch ranking

Some branches should visually be excluded if they fail shelf or capacity logic. This must be visible in a clean and minimal way.

Next is Logistics Planning. Keep it operational and compact:
- warehouse assignment
- dispatch planning
- route optimization
- delivery sequence
- shipment risk detection

Next is Human Approval Layer. This should feel secure and authoritative, using a shield-like or decision-gate visual style. Include:
- approval summary
- AI recommendation
- confidence score
- audit trail indication

Next is Execution Engine. This should represent the real operational actions:
- purchase orders
- warehouse tasks
- store tasks
- delivery workflow
- launch activation

Next is Monitoring and Feedback Loop. This should visually reconnect back into earlier steps to show continuous learning:
- sales tracking
- wastage monitoring
- stock depletion
- replenishment signals
- allocation optimization
- AI feedback learning

CONTEXTUAL OVERLAYS

Some steps must open contextual overlays instead of redirecting the user away from the canvas.

These overlays must appear on top of the /app screen as premium modal-like panels.
The background workflow must remain visible behind them.
The user should clearly understand that the overlay is layered over the live workflow, not replacing it.

The overlay should open in two cases:
- when the workflow reaches a step that requires user data
- when the user double-clicks a step node

The overlay must not close automatically while the step is still active.
It should only close after the step is completed or when the user intentionally closes it after completion.

PRODUCT INTAKE OVERLAY

When Product Intake becomes active, open a premium overlay on top of the app.

The overlay should be split into two main sides.

Left side:
- product image upload area
- drag and drop file zone
- CSV upload
- Excel upload
- manual file input
- clear upload states

Right side:
- product fields such as title, description, brand, category, subcategory, family, barcode, packaging, unit size, weight, shelf life, storage condition, origin, supplier, launch date, and any other relevant data already defined in the workflow

Behavior rules:
- If the user uploads only images, the right side remains manually editable and empty fields must be filled by the user or AI extraction.
- If the user uploads CSV or Excel, the corresponding fields must auto-fill from the file.
- Do not force the user to manually re-enter data that is already present in the file.

The overlay must include a primary action such as:
- Extract Data
- Run AI Similarity
- Continue

SIMILARITY INTELLIGENCE OVERLAY

When the workflow reaches Similarity Intelligence Engine, open another premium overlay.

This overlay must simulate AI search behavior.

Left side:
- uploaded product image
- rotating or cycling product thumbnails
- fast visual changes that simulate searching similar items
- premium search motion
- subtle search activity indicators

Right side:
- the product data fields
- skeleton loading states
- shimmer placeholders
- loading feedback while AI is matching

The experience should make it look like:
- the image or file has already been uploaded
- the system is now searching for similar products
- data is being auto-detected and matched

When the search is running:
- the left side should animate through several product visuals
- the right side should show skeleton loading effects
- the overlay should display subtle logs and progress feedback

When the search ends:
- show the matched product image
- show the matched product title
- show the match rating
- show a confidence score
- show a short similarity summary
- keep the result compact, premium, and highly readable

Other steps may also open overlays if they require user confirmation, approval, or input.
Only open overlays where necessary.
Do not make every step open a modal.

VISUAL STYLE

The design should be:
- minimalist
- premium
- advanced
- functional
- readable
- elegant
- enterprise-grade

Use:
- Bravo green as the active execution color
- muted gray for completed states
- subtle shadows
- thin borders
- soft motion
- clean typography
- premium spacing
- no clutter

Do not make the workflow chaotic.
Do not over-expand every step.
Only complex steps should show sub-nodes or grouped branches.
Only steps that need interaction should open contextual overlays.

INTERACTION MODEL

The canvas must stay fully interactive:
- drag to pan
- zoom with wheel or trackpad
- double click a node to open its overlay
- keep the workflow visible behind overlays
- keep active step state visible while running
- keep logs updating in the bottom-right corner

FINAL EXPERIENCE

The result should feel like a next-generation AI retail workflow operating system for Bravo supermarkets.
The user should press Start and see the workflow execute step by step.
The current step should glow with a premium green execution effect.
Completed steps should become muted and done.
The bottom-right log panel should keep updating.
When the workflow reaches steps that need input, a premium overlay should appear on top of the app, with the canvas still visible behind it.
The whole system should remain minimal, sophisticated, and highly functional.